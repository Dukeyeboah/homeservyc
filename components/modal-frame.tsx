'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { useState, type ReactNode } from 'react';
export function ModalFrame({ title, onClose, children, wide = false }: { title: string; onClose: () => void; children: ReactNode; wide?: boolean }) {
 const [returnFocus] = useState(() => typeof document === 'undefined' ? null : document.activeElement as HTMLElement | null);
 return <Dialog.Root open onOpenChange={open => { if (!open) onClose(); }}><Dialog.Portal><Dialog.Overlay className="fixed inset-0 z-[70] bg-slate-950/30 backdrop-blur-sm"/><Dialog.Content onCloseAutoFocus={e => { e.preventDefault(); returnFocus?.focus(); }} aria-describedby={undefined} className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[71] bg-white rounded-3xl shadow-2xl w-[calc(100%-2rem)] ${wide ? 'max-w-2xl' : 'max-w-md'} max-h-[90dvh] overflow-y-auto focus:outline-none`}><Dialog.Title className="sr-only">{title}</Dialog.Title>{children}</Dialog.Content></Dialog.Portal></Dialog.Root>;
}
