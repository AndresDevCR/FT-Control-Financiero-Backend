import { Injectable, NotFoundException } from '@nestjs/common';
// import PDFDocument = require('pdfkit');
import { Buffer } from 'buffer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as qrcode from 'qrcode';
import { join, resolve } from 'path';
import { Quotation } from '@/modules/financial_control/quotation/entities/quotation.entity';
import { Client } from '@/modules/financial_control/client/entities/client.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PDFDocument = require('pdfkit-table');

@Injectable()
export class QuotationService {
  constructor(
    @InjectRepository(Quotation)
    private readonly quotationRepository: Repository<Quotation>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
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
        const quotation = await this.quotationRepository.findOne({
          where: { id },
        });
        const client = await this.clientRepository.findOne({
          where: { id: quotation.client_id },
        });

        if (!quotation) {
          throw new NotFoundException('No se encontró el quotation solicitado');
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
          doc.text('Cotizaciones', {
            width: doc.page.width,
            align: 'center',
          });
          doc.moveDown();

          doc.addPage();
          doc.text('', 50, 70);
          doc.font('Helvetica-Bold').fontSize(20);
          doc.text('Cotizaciones');
          doc.moveDown();
          doc.font('Helvetica').fontSize(16);

          doc.text('', {
            width: doc.page.width,
            align: 'center',
          });
          doc.moveDown();

          const table = {
            title: 'Tabla de detalles de Cotizaciones',
            subtitle:
              'A continuación se muestran los detalles de las Cotizaciones',
            headers: ['Nombre', 'Descripción'],

            rows: [
              ['ID', `${quotation.id}`],
              ['Cliente', `${client.client_name}`],
              ['Total de pago', `${quotation.total_payment}`],
              ['Total de pago en dólares', `${quotation.total_payment_dollar}`],
              ['Código de factura electrónica', `${quotation.e_invoice_code}`],
              ['Fecha de emisión', `${quotation.issue_date}`],
              ['Número de orden de compra', `${quotation.po_number}`],
              ['Fecha de orden de compra', `${quotation.po_date}`],
              ['Descripción', `${quotation.description}`],
              ['Título de la cotización', `${quotation.quote_title}`],
              ['Fecha de creación', `${quotation.created_at}`],
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
            `https://control-financiero.vercel.app/quotation/details/${quotation.id}`,
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
