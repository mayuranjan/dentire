import { Injectable } from '@nestjs/common';
import {promises as fs} from 'fs';
import { Product } from './product.model';

@Injectable()
export class AppService {

  async searchProducts(queryString: string): Promise<any> {
    const amazonData = await this.searchAmazonData(queryString);
    const cromaData = await this.searchCromaData(queryString);
    const flipkartData = await this.searchFlipkartData(queryString);
    const relianceDigitalData = await this.searchRelianceDigitalData(queryString);
    return { results: { 'amazon': amazonData, 'flipkart': flipkartData, 'croma': cromaData, 'reliance_digital': relianceDigitalData, } };
  }

  async searchAmazonData(queryString: string) {
    return await this.readFile('src\\data\\amazon_data.json').then((data) => {
      const jsonData: { products: Array<Product> } = JSON.parse(data);
      return jsonData.products.filter((eachProduct) => {
        return eachProduct.name.toLowerCase().includes(queryString.toLowerCase());
      });
    });
  }

  async searchCromaData(queryString: string) {
    return await this.readFile('src\\data\\croma_data.json').then((data) => {
      const jsonData: { products: Array<Product> } = JSON.parse(data);
      return jsonData.products.filter((eachProduct) => {
        return eachProduct.name.toLowerCase().includes(queryString.toLowerCase());
      });
    });
  }

  async searchFlipkartData(queryString: string) {
    return await this.readFile('src\\data\\flipkart_data.json').then((data) => {
      const jsonData: { products: Array<Product> } = JSON.parse(data);
      return jsonData.products.filter((eachProduct) => {
        return eachProduct.name.toLowerCase().includes(queryString.toLowerCase());
      });
    });
  }

  async searchRelianceDigitalData(queryString: string) {
    return await this.readFile('src\\data\\reliance_digital_data.json').then((data) => {
      const jsonData: { products: Array<Product> } = JSON.parse(data);
      return jsonData.products.filter((eachProduct) => {
        return eachProduct.name.toLowerCase().includes(queryString.toLowerCase());
      });
    });
  }

  async readFile(filePath): Promise<any> {
    try {
      const data: string = await fs.readFile(filePath, 'utf-8');
      return data
    } catch (err) {
      console.error(err);
    }
  }

}
