import React from 'react';
import { ArrowLeft, Download, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ApkDownload() {
    const configuredUrl = (import.meta.env.VITE_APK_URL || '').trim();
    const blobBaseUrl =
        'https://vidazenstoragettescom.blob.core.windows.net/apk/app-release.apk';

    let apkUrl = blobBaseUrl;
    if (configuredUrl.startsWith('http://') || configuredUrl.startsWith('https://')) {
        apkUrl = configuredUrl;
    } else if (configuredUrl) {
        const sasQuery = configuredUrl.replace(/^[?&]/, '');
        apkUrl = `${blobBaseUrl}?${sasQuery}`;
    }

    return (
        <div className="min-h-screen bg-[#f8fcfc] text-[#0e1b1b]">
            <div className="mx-auto flex w-full max-w-[960px] flex-col px-4 py-8 md:px-8 md:py-12">
                <div className="mb-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 rounded-xl border border-[#d0e7e7] bg-white px-4 py-2 text-sm font-semibold text-[#0e1b1b] transition hover:bg-[#edf7f7]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Volver al inicio
                    </Link>
                </div>

                <div className="rounded-2xl border border-[#d0e7e7] bg-white p-6 shadow-sm md:p-10">
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e7f3f3]">
                        <Smartphone className="h-7 w-7 text-[#0e1b1b]" />
                    </div>

                    <h1 className="text-3xl font-black leading-tight md:text-4xl">
                        Descarga VidaZen para Android
                    </h1>

                    <p className="mt-4 max-w-[680px] text-base leading-relaxed text-[#4e9797]">
                        Instala la app en tu celular para acceder a tus actividades, citas y
                        seguimiento de bienestar.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <a
                            href={apkUrl}
                            download
                            className="inline-flex items-center gap-2 rounded-xl bg-[#0e1b1b] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1c2f2f]"
                        >
                            <Download className="h-4 w-4" />
                            Descargar APK
                        </a>

                        <span className="rounded-lg bg-[#e7f3f3] px-3 py-2 text-xs font-medium text-[#2d6a6a] md:text-sm">
                            Compatible con Android
                        </span>
                    </div>

                    <div className="mt-8 rounded-xl border border-[#d0e7e7] bg-[#f8fcfc] p-4 text-sm text-[#2d6a6a] md:p-5">
                        <p className="font-semibold text-[#0e1b1b]">Si el botón no descarga:</p>
                        <ol className="mt-2 list-decimal space-y-1 pl-5">
                            <li>Abre el enlace en Chrome desde Android.</li>
                            <li>Permite instalación de apps de orígenes externos.</li>
                            <li>Instala el archivo cuando termine la descarga.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}