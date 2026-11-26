export interface Donation {
  id: number;
  donor: string;
  email: string;
  amount: number;
  date: string;
}

export const donationsMock: Donation[] = [
  {
    id: 1,
    donor: "Juan Pérez",
    email: "juan.perez@email.com",
    amount: 5000,
    date: "20/11/2026",
  },
  {
    id: 2,
    donor: "Ana López",
    email: "ana.lopez@email.com",
    amount: 2500,
    date: "21/11/2026",
  },
  {
    id: 3,
    donor: "Carlos Gómez",
    email: "carlos.gomez@email.com",
    amount: 10000,
    date: "22/11/2026",
  },
  {
    id: 4,
    donor: "María Torres",
    email: "maria.torres@email.com",
    amount: 7500,
    date: "23/11/2026",
  },
];