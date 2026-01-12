'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown, Plus, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAllCategories } from '@/lib/services';
import { useAuth } from '@/contexts/auth-context';
import { AuthModal } from '@/components/auth-modal';
import { UserMenu } from '@/components/user-menu';

const categories = getAllCategories();

export function Navigation({ onAddClick }: { onAddClick: () => void }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { isAuthenticated, user } = useAuth();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Listen to filter changes to keep selectedCategory in sync
  useEffect(() => {
    const handleFilterChange = (e: CustomEvent) => {
      if (e.detail.category !== undefined) {
        setSelectedCategory(e.detail.category);
      }
    };

    window.addEventListener(
      'filterChanged',
      handleFilterChange as EventListener
    );
    return () =>
      window.removeEventListener(
        'filterChanged',
        handleFilterChange as EventListener
      );
  }, []);

  return (
    <nav className='sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <div className='flex items-center justify-between gap-2 md:gap-6'>
          {/* Logo */}
          <Link href='/' className='flex-shrink-0'>
            <span className='text-lg md:text-2xl font-medium tracking-tight'>
              HomeServyc
            </span>
          </Link>

          {/* Right side: Categories, Search, Add button */}
          <div className='hidden md:flex items-center gap-4 ml-auto'>
            {/* Categories Dropdown - Only show on home page */}
            {isHomePage && (
              <div className='relative'>
                <button
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className='flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-lg transition-colors'
                >
                  {selectedCategory || 'Categories'}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      categoryOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {categoryOpen && (
                  <>
                    <div
                      className='fixed inset-0 z-[5]'
                      onClick={() => setCategoryOpen(false)}
                    />
                    <div className='absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-md py-2 z-10 max-h-[400px] overflow-y-auto'>
                      <button
                        onClick={() => {
                          setSelectedCategory(null);
                          setCategoryOpen(false);
                          window.dispatchEvent(
                            new CustomEvent('filterChanged', {
                              detail: { category: null },
                            })
                          );
                        }}
                        className='w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors'
                      >
                        All Services
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setCategoryOpen(false);
                            window.dispatchEvent(
                              new CustomEvent('filterChanged', {
                                detail: { category: cat },
                              })
                            );
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                            selectedCategory === cat
                              ? 'bg-muted font-medium'
                              : ''
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Search Input - Commented out for now */}
            {/* <input
              type='text'
              placeholder='Search by name...'
              className='px-4 py-2 bg-secondary text-foreground placeholder-muted-foreground rounded-lg text-sm border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-shadow'
              onChange={(e) =>
                window.dispatchEvent(
                  new CustomEvent('filterChanged', {
                    detail: { search: e.target.value },
                  })
                )
              }
            /> */}

            {/* Add Recommendation Button */}
            <Button
              onClick={onAddClick}
              className='flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-all hover:shadow-lg'
            >
              <Plus size={18} />
              <span className='hidden sm:inline'>Add</span>
            </Button>

            {/* Sign In/User Menu */}
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Button
                onClick={() => setShowAuthModal(true)}
                variant='ghost'
                className='flex items-center gap-2 px-3 py-2'
              >
                <LogIn size={18} />
                <span className='hidden sm:inline'>Sign In</span>
              </Button>
            )}
          </div>

          {/* Mobile menu: Categories, Add button, Auth */}
          <div className='md:hidden flex items-center gap-1.5 flex-shrink-0'>
            {/* Mobile Categories Dropdown - Only show on home page */}
            {isHomePage && (
              <div className='relative flex-shrink-0'>
                <button
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className='flex items-center gap-1 px-1.5 py-1.5 text-xs hover:bg-muted rounded-lg transition-colors'
                >
                  <span className='max-w-[70px] truncate'>
                    {selectedCategory || 'Cat'}
                  </span>
                  <ChevronDown
                    size={12}
                    className={`transition-transform flex-shrink-0 ${
                      categoryOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {categoryOpen && (
                  <>
                    <div
                      className='fixed inset-0 z-10'
                      onClick={() => setCategoryOpen(false)}
                    />
                    <div className='absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-md py-2 z-20 max-h-[60vh] overflow-y-auto'>
                      <button
                        onClick={() => {
                          setSelectedCategory(null);
                          setCategoryOpen(false);
                          window.dispatchEvent(
                            new CustomEvent('filterChanged', {
                              detail: { category: null },
                            })
                          );
                        }}
                        className='w-full text-left px-4 py-2 text-xs hover:bg-muted transition-colors'
                      >
                        All Services
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setCategoryOpen(false);
                            window.dispatchEvent(
                              new CustomEvent('filterChanged', {
                                detail: { category: cat },
                              })
                            );
                          }}
                          className={`w-full text-left px-4 py-2 text-xs hover:bg-muted transition-colors ${
                            selectedCategory === cat
                              ? 'bg-muted font-medium'
                              : ''
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Mobile Add Button */}
            <Button
              onClick={onAddClick}
              className='flex items-center justify-center bg-primary hover:bg-primary/90 flex-shrink-0'
              size='sm'
            >
              <Plus size={16} />
            </Button>

            {/* Mobile Sign In/User Menu */}
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Button
                onClick={() => setShowAuthModal(true)}
                variant='ghost'
                size='sm'
                className='p-1.5 flex-shrink-0'
              >
                <LogIn size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          initialMode='signin'
        />
      )}
    </nav>
  );
}
