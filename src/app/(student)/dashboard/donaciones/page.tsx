"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { studentService } from "@/services/studentService";
import type { Donation } from "@/types";
import DonationHistory from "@/components/student/DonationHistory";

export default function DonationsPage() {
  const { user } = useAuth();
  const { notify } = useToast();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = user?.id;
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    studentService
      .getDonations(userId)
      .then((d) => {
        if (!cancelled) setDonations(d);
      })
      .catch(() => {
        if (!cancelled) notify("No se pudieron cargar tus datos.", "error");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [userId, notify]);

  if (loading) return <p className="text-slate-500">Cargando tus datos...</p>;

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-bold">Historial de donaciones</h2>
      <DonationHistory donations={donations} />
    </section>
  );
}
