'use client';
import Link from 'next/link';
import { LogOut, LayoutDashboard, User, ChevronDown } from 'lucide-react';
import { signOut } from '@/lib/firebase-auth';
import { useAuth } from '@/contexts/auth-context';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu';
export function UserMenu() {
 const { user } = useAuth();
 const displayName = user?.displayName || user?.email?.split('@')[0] || 'Account';
 return <DropdownMenu><DropdownMenuTrigger asChild><button aria-label="Account menu" className="flex items-center gap-2 p-2 rounded-full hover:bg-muted"><User size={20}/><ChevronDown size={14}/></button></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-52 rounded-xl"><DropdownMenuLabel>{displayName}</DropdownMenuLabel><DropdownMenuSeparator/><DropdownMenuItem asChild><Link href="/dashboard"><LayoutDashboard/>Dashboard</Link></DropdownMenuItem><DropdownMenuItem asChild><Link href="/profile"><User/>Profile</Link></DropdownMenuItem><DropdownMenuSeparator/><DropdownMenuItem onSelect={() => { void signOut().catch(console.error); }}><LogOut/>Sign out</DropdownMenuItem></DropdownMenuContent></DropdownMenu>;
}
