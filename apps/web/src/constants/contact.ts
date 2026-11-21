import { whatsappUrl } from '@/lib/contact-links';

export const consultationPhone = '+55 (62) 98176-7157';
export const consultationWhatsappUrl = whatsappUrl({
  phone: consultationPhone,
  text: 'Olá ! Gostaria de marcar um horário para conversar sobre o meu caso…',
});
