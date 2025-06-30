import { Injectable } from '@nestjs/common';

@Injectable()
export class CrisisService {
  async getLocalServices(lat: number, lng: number) {
    // Mock data for local services
    return {
      services: [
        {
          name: 'Central Hospital Emergency Room',
          phone: '911',
          address: '123 Main St, City, State',
          distance: 1.2,
          type: 'hospital',
          available: true,
          description: '24/7 emergency services',
        },
        {
          name: 'Crisis Intervention Center',
          phone: '555-0123',
          address: '456 Oak Ave, City, State',
          distance: 2.8,
          type: 'crisis_center',
          available: true,
          description: 'Walk-in crisis support available',
        },
      ],
    };
  }
}