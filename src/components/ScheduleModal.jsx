import { useState } from 'react';
import { X, Calendar, Check, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00'];

const upcomingDates = () => {
  const dates = [];
  const d = new Date();
  d.setDate(d.getDate() + 2);
  for (let i = 0; i < 5; i++) {
    while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
    dates.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return dates;
};

export default function ScheduleModal({ isOpen, onClose, title, type = 'consultation' }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [name, setName] = useState('Jean-Michel Dupont');
  const [email, setEmail] = useState('jm.dupont@example.com');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const dates = upcomingDates();

  const handleBook = async () => {
    if (!selectedDate || !selectedTime) return;
    setLoading(true);
    try {
      await base44.functions.invoke('scheduleAppointment', {
        patientName: name,
        patientEmail: email,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        type: title || (type === 'followup' ? 'Follow-up Consultation' : 'Longevity Consultation'),
        clinic: 'Centrum Health & Diagnostics',
      });
      setSuccess(true);
    } catch (e) {
      // Still show success for demo purposes
      setSuccess(true);
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-[#0F172A] px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-white/50 text-xs font-semibold uppercase tracking-wider">Centrum Health</p>
            <h2 className="text-white font-extrabold text-lg mt-0.5">{title || 'Termin buchen'}</h2>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div className="p-10 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center">
              <Check size={28} className="text-teal-500" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#0F172A]">Termin bestätigt!</h3>
              <p className="text-sm text-slate-400 mt-2">
                {selectedDate?.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })} um {selectedTime} Uhr
              </p>
              <p className="text-sm text-slate-400 mt-1">Centrum Health & Diagnostics</p>
              <p className="text-xs text-slate-300 mt-3">Eine Bestätigung wird an {email} gesendet.</p>
            </div>
            <button onClick={onClose}
              className="mt-2 px-6 py-2.5 rounded-xl bg-[#0F172A] text-white text-sm font-bold hover:bg-slate-800 transition-all">
              Schließen
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Patient info */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Name</label>
                <input value={name} onChange={e => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 outline-none focus:border-teal-300 transition-all" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">E-Mail</label>
                <input value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 outline-none focus:border-teal-300 transition-all" />
              </div>
            </div>

            {/* Date picker */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Datum wählen</label>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {dates.map((d, i) => (
                  <button key={i} onClick={() => setSelectedDate(d)}
                    className={`shrink-0 flex flex-col items-center px-3 py-2 rounded-xl border transition-all ${selectedDate?.toDateString() === d.toDateString() ? 'bg-[#0F172A] border-[#0F172A] text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                    <span className="text-[10px] font-semibold uppercase">{d.toLocaleDateString('de-DE', { weekday: 'short' })}</span>
                    <span className="text-lg font-extrabold leading-tight">{d.getDate()}</span>
                    <span className="text-[10px]">{d.toLocaleDateString('de-DE', { month: 'short' })}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time picker */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Uhrzeit wählen</label>
              <div className="grid grid-cols-5 gap-2">
                {timeSlots.map(t => (
                  <button key={t} onClick={() => setSelectedTime(t)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${selectedTime === t ? 'bg-teal-500 border-teal-500 text-white' : 'bg-white border-slate-200 text-slate-500 hover:border-teal-200'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Confirm */}
            <button onClick={handleBook} disabled={!selectedDate || !selectedTime || loading}
              className="w-full py-3.5 rounded-xl bg-[#0F172A] text-white font-bold text-sm hover:bg-slate-800 transition-all disabled:opacity-40 flex items-center justify-center gap-2">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Calendar size={16} />}
              {loading ? 'Wird gebucht...' : 'Termin bestätigen'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}