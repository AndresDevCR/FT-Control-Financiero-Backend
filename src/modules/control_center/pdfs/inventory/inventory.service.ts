import { Injectable, NotFoundException } from '@nestjs/common';
// import PDFDocument = require('pdfkit');
import { Buffer } from 'buffer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as qrcode from 'qrcode';
import { join, resolve } from 'path';
import { Inventory } from '@/modules/financial_control/inventory/inventory.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PDFDocument = require('pdfkit-table');

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  async generateQRCode(url: string): Promise<Buffer> {
    const options = {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000ff',
        light: '#ffffffff',
      },
    };
    return await qrcode.toBuffer(url, options);
  }

  async generarPDF(id: any): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise(async (resolve) => {
      try {
        const inventory = await this.inventoryRepository.findOne({
          where: { id },
        });

        if (!inventory) {
          throw new NotFoundException('No se encontró el inventory solicitado');
        } else {
          const doc = new PDFDocument({
            size: 'LETTER',
            bufferPages: true,
            autoFirstPage: false,
          });

          let pageNumber = 0;
          doc.on('pageAdded', () => {
            pageNumber++;
            const bottom = doc.page.margins.bottom;

            if (pageNumber > 1) {
              doc.image(
                join(process.cwd(), '/src/img/FT.png'),
                doc.page.width - 100,
                5,
                { fit: [45, 45], align: 'center' },
              );
              doc
                .moveTo(50, 55)
                .lineTo(doc.page.width - 50, 55)
                .stroke();
            }

            doc.page.margins.bottom = 0;
            doc.font('Helvetica').fontSize(14);
            doc.text(
              'Pág. ' + pageNumber,
              0.5 * (doc.page.width - 100),
              doc.page.height - 50,
              {
                width: 100,
                align: 'center',
                lineBreak: false,
              },
            );
            doc.page.margins.bottom = bottom;
          });

          doc.addPage();
          doc.image(
            join(process.cwd(), '/src/img/FT.png'),
            doc.page.width / 2 - 100,
            150,
            { width: 200 },
          );
          doc.moveDown();
          doc.text('', 0, 400);
          doc.font('Helvetica-Bold').fontSize(24);
          doc.text('Inventario', {
            width: doc.page.width,
            align: 'center',
          });
          doc.moveDown();

          doc.addPage();
          doc.text('', 50, 70);
          doc.font('Helvetica-Bold').fontSize(20);
          doc.text('Inventario');
          doc.moveDown();
          doc.font('Helvetica').fontSize(16);

          doc.text('', {
            width: doc.page.width,
            align: 'center',
          });
          doc.moveDown();

          const table = {
            title: 'Tabla de detalles del inventory',
            subtitle: 'A continuación se muestran los detalles del Inventario',
            headers: ['Nombre', 'Descripción'],
            rows: [
              ['ID', `${inventory.id}`],
              ['Nombre', `${inventory.productName}`],
              ['Cantidad disponible', `${inventory.availableQuantity}`],
              ['Descripción', `${inventory.description}`],
            ],
          };

          doc.table(table, {
            columnsSize: [200, 300],
            prepareHeader: () => doc.font('Helvetica-Bold').fontSize(16),
            prepareRow: (row, i) => doc.font('Helvetica').fontSize(14),
            prepareTitle: () => doc.font('Helvetica-Bold').fontSize(24),
            prepareSubtitle: () => doc.font('Helvetica-Bold').fontSize(20),
            vLineColor: '#bfbfbf',
            hLineWidth: function (i, node) {
              return i === 0 || i === node.table.body.length ? 2 : 1;
            },
            vLineWidth: function (i, node) {
              return i === 0 || i === node.table.widths.length ? 2 : 1;
            },

            styles: {
              lineColor: '#000',
              lineWidth: 0.5,
            },
          });

          doc.addPage();
          doc.text('', 50, 70);
          doc.font('Helvetica-Bold').fontSize(20);
          doc.moveDown();
          doc.font('Helvetica').fontSize(16);

          const qrCodeBuffer = await this.generateQRCode(
            `https://control-financiero.vercel.app/inventory/details/${inventory.id}`,
          );
          // Agregar el código QR al PDF
          doc.image(qrCodeBuffer, {
            fit: [200, 200],
            align: 'center',
            valign: 'center',
          });

          const buffer = [];
          doc.on('data', buffer.push.bind(buffer));
          doc.on('end', () => {
            const data = Buffer.concat(buffer);
            resolve(data);
          });
          doc.end();
        }
      } catch (error) {
        console.log(error);
      }
    });

    return pdfBuffer;
  }
}
