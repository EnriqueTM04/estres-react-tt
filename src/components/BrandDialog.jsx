import React from 'react';
import logo from '../assets/Isotipo-Logo Final-04.svg';

export default function BrandDialog({
    isOpen,
    title = 'VidaZen',
    message,
    variant = 'info',
    confirmText = 'Entendido',
    cancelText = 'Cancelar',
    showCancel = false,
    onConfirm,
    onClose,
}) {
    if (!isOpen) return null;

    const isError = variant === 'error';
    const primaryButtonClass = isError
        ? 'bg-[#F5B7B1] hover:bg-[#eba8a1] text-[#7B241C]'
        : 'bg-[#A2D9CE] hover:bg-[#8ecbc0] text-[#2C3E50]';

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
            return;
        }

        if (onClose) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-[#2C3E50]/45 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative w-full max-w-md rounded-3xl bg-[#F8FBFB] shadow-2xl border border-[#d8e9e6] px-6 py-7 text-center font-['Nunito_Sans']">
                <div className="flex justify-center mb-3">
                    <img src={logo} alt="Logo VidaZen" className="w-20 h-20" />
                </div>

                <h3 className="text-5xl font-['Montserrat'] font-bold text-[#2C3E50] tracking-tight mb-4">
                    {title}
                </h3>

                <p className="text-xl text-[#34495E] leading-relaxed mb-7">
                    {message}
                </p>

                <div className="flex items-center justify-center gap-3">
                    {showCancel && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="min-w-[132px] rounded-2xl bg-white border border-[#d2dfdc] px-5 py-3 text-lg font-bold text-[#2C3E50] hover:bg-[#f1f6f5] transition-colors"
                        >
                            {cancelText}
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={handleConfirm}
                        className={`min-w-[132px] rounded-2xl px-5 py-3 text-lg font-bold transition-colors ${primaryButtonClass}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
