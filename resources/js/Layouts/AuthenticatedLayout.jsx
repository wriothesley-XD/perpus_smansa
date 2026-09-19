import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { HamburgerButton } from '@/Components/Common/HamburgerButton';
import { LayoutDashboard, LogOut, User } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <HamburgerButton
                                isOpen={showingNavigationDropdown}
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                ariaLabel="Buka menu navigasi"
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile menu with smooth height expansion & icons */}
                <div
                    className={`mobile-menu-drawer sm:hidden border-t border-gray-200 bg-white ${
                        showingNavigationDropdown ? 'is-open border-b shadow-sm' : ''
                    }`}
                >
                    <div className="overflow-hidden">
                        <div className="space-y-1 pb-3 pt-2 px-3">
                            <div
                                style={{
                                    transitionDelay: showingNavigationDropdown ? '40ms' : '0ms',
                                }}
                                className={`transition-all duration-300 ease-out transform ${
                                    showingNavigationDropdown
                                        ? 'opacity-100 translate-x-0'
                                        : 'opacity-0 -translate-x-4 pointer-events-none'
                                }`}
                            >
                                <ResponsiveNavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    onClick={() => setShowingNavigationDropdown(false)}
                                    className="flex items-center gap-2.5 rounded-lg font-medium"
                                >
                                    <LayoutDashboard size={16} />
                                    <span>Dashboard</span>
                                </ResponsiveNavLink>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pb-3 pt-4 px-4">
                            <div
                                style={{
                                    transitionDelay: showingNavigationDropdown ? '80ms' : '0ms',
                                }}
                                className={`flex items-center gap-3 transition-all duration-300 ease-out transform ${
                                    showingNavigationDropdown
                                        ? 'opacity-100 translate-x-0'
                                        : 'opacity-0 -translate-x-4 pointer-events-none'
                                }`}
                            >
                                <div className="grid size-9 place-items-center rounded-full bg-slate-100 text-slate-700 font-bold text-xs">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-800">
                                        {user.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {user.email}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <div
                                    style={{
                                        transitionDelay: showingNavigationDropdown ? '120ms' : '0ms',
                                    }}
                                    className={`transition-all duration-300 ease-out transform ${
                                        showingNavigationDropdown
                                            ? 'opacity-100 translate-x-0'
                                            : 'opacity-0 -translate-x-4 pointer-events-none'
                                    }`}
                                >
                                    <ResponsiveNavLink
                                        href={route('profile.edit')}
                                        onClick={() => setShowingNavigationDropdown(false)}
                                        className="flex items-center gap-2.5 rounded-lg"
                                    >
                                        <User size={16} />
                                        <span>Profile</span>
                                    </ResponsiveNavLink>
                                </div>
                                <div
                                    style={{
                                        transitionDelay: showingNavigationDropdown ? '160ms' : '0ms',
                                    }}
                                    className={`transition-all duration-300 ease-out transform ${
                                        showingNavigationDropdown
                                            ? 'opacity-100 translate-x-0'
                                            : 'opacity-0 -translate-x-4 pointer-events-none'
                                    }`}
                                >
                                    <ResponsiveNavLink
                                        method="post"
                                        href={route('logout')}
                                        as="button"
                                        onClick={() => setShowingNavigationDropdown(false)}
                                        className="flex items-center gap-2.5 rounded-lg text-rose-600 hover:text-rose-700"
                                    >
                                        <LogOut size={16} />
                                        <span>Log Out</span>
                                    </ResponsiveNavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
