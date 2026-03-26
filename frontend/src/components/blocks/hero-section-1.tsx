import React from 'react'
import { ArrowRight, ChevronRight, Menu, X, Recycle, Trash2, AlertTriangle, Package, Scissors } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { cn } from '@/lib/utils'

// Simple anchor wrapper — replaces next/link in non-Next.js environments
const Link = ({
  href,
  className,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
)

const transitionVariants = {
  item: {
    hidden: { opacity: 0, filter: 'blur(12px)', y: 12 },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { type: 'spring', bounce: 0.3, duration: 1.5 },
    },
  },
}

export function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        {/* Subtle background glows */}
        <div
          aria-hidden
          className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block"
        >
          <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(160,84%,39%,.12)_0,hsla(160,84%,39%,.03)_50%,transparent_80%)]" />
          <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(160,84%,39%,.08)_0,transparent_100%)] [translate:5%_-50%]" />
        </div>

        {/* Hero section */}
        <section>
          <div className="relative pt-24 md:pt-36">
            <AnimatedGroup
              variants={{
                container: {
                  visible: { transition: { delayChildren: 0.6 } },
                },
                item: {
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: 'spring', bounce: 0.3, duration: 2 },
                  },
                },
              }}
              className="absolute inset-0 -z-20"
            >
              <img
                src="https://ik.imagekit.io/lrigu76hy/tailark/night-background.jpg?updatedAt=1745733451120"
                alt="background"
                className="absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block"
                width="3276"
                height="4095"
              />
            </AnimatedGroup>
            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"
            />

            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  {/* Badge */}
                  <Link
                    href="#models"
                    className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                  >
                    <span className="text-foreground text-sm">
                      Powered by YOLO &amp; YOLO26n models available
                    </span>
                    <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700" />
                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Headline */}
                  <h1 className="mt-8 max-w-4xl mx-auto text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem] font-bold">
                    AI-Powered Waste Detection &amp; Smart Segregation
                  </h1>

                  {/* Description */}
                  <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground">
                    Real-time waste classification using YOLOv8. Point your camera or upload an
                    image — instantly identify recyclable, non-recyclable, and hazardous materials.
                  </p>
                </AnimatedGroup>

                {/* CTA buttons */}
                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: { staggerChildren: 0.05, delayChildren: 0.75 },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  <div key={1} className="bg-foreground/10 rounded-[14px] border p-0.5">
                    <Button asChild size="lg" className="rounded-xl px-5 text-base">
                      <Link href="#camera">
                        <span className="text-nowrap">Try Live Detection</span>
                      </Link>
                    </Button>
                  </div>
                  <Button
                    key={2}
                    asChild
                    size="lg"
                    variant="ghost"
                    className="h-10.5 rounded-xl px-5"
                  >
                    <Link href="#upload">
                      <span className="text-nowrap">Upload an Image</span>
                    </Link>
                  </Button>
                </AnimatedGroup>
              </div>
            </div>

            {/* App screenshot preview */}
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: { staggerChildren: 0.05, delayChildren: 0.75 },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                <div
                  aria-hidden
                  className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                />
                <div className="bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1 ring-border">
                  {/* Waste category preview — 5 classes from class_balance.csv */}
                  <div className="aspect-[15/8] relative rounded-2xl bg-slate-900 flex items-center justify-center p-6">
                    <div className="grid grid-cols-5 gap-3 w-full">
                      <WasteCategoryCard
                        icon={<Recycle className="size-6" />}
                        label="Recyclable"
                        items={['5,758 samples']}
                        color="emerald"
                      />
                      <WasteCategoryCard
                        icon={<Trash2 className="size-6" />}
                        label="Non-Recyclable"
                        items={['5,980 samples']}
                        color="blue"
                      />
                      <WasteCategoryCard
                        icon={<AlertTriangle className="size-6" />}
                        label="Hazardous"
                        items={['3,610 samples']}
                        color="red"
                      />
                      <WasteCategoryCard
                        icon={<Package className="size-6" />}
                        label="Other Waste"
                        items={['2,440 samples']}
                        color="amber"
                      />
                      <WasteCategoryCard
                        icon={<Scissors className="size-6" />}
                        label="Medical / Textile"
                        items={['2,111 samples']}
                        color="purple"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>

        {/* Stats / feature highlights section */}
        <section className="bg-background pb-16 pt-16 md:pb-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center mb-12">
              <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium mb-3">
                Detection Capabilities
              </p>
              <h2 className="text-3xl font-bold text-foreground">
                5 detection classes. 12,158 training samples.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {[
                {
                  value: '5,758',
                  label: 'Recyclable',
                  desc: 'Training samples',
                  color: 'text-emerald-400',
                  border: 'border-emerald-500/20',
                  bg: 'bg-emerald-500/5',
                },
                {
                  value: '5,980',
                  label: 'Non-Recyclable',
                  desc: 'Training samples',
                  color: 'text-blue-400',
                  border: 'border-blue-500/20',
                  bg: 'bg-blue-500/5',
                },
                {
                  value: '3,610',
                  label: 'Hazardous',
                  desc: 'Training samples',
                  color: 'text-red-400',
                  border: 'border-red-500/20',
                  bg: 'bg-red-500/5',
                },
                {
                  value: '2,440',
                  label: 'Other Waste',
                  desc: 'Training samples',
                  color: 'text-amber-400',
                  border: 'border-amber-500/20',
                  bg: 'bg-amber-500/5',
                },
                {
                  value: '2,111',
                  label: 'Medical / Textile',
                  desc: 'Training samples',
                  color: 'text-purple-400',
                  border: 'border-purple-500/20',
                  bg: 'bg-purple-500/5',
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={cn(
                    'rounded-2xl border p-6 text-center',
                    stat.border,
                    stat.bg,
                  )}
                >
                  <div className={cn('text-5xl font-bold mb-2', stat.color)}>{stat.value}</div>
                  <div className="font-semibold text-foreground mb-2">{stat.label}</div>
                  <p className="text-muted-foreground text-sm">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

// ─── Waste Category Card ──────────────────────────────────────────────────────

type CardColor = 'emerald' | 'blue' | 'red' | 'amber' | 'purple'

const colorMap: Record<CardColor, { icon: string; border: string; bg: string; dot: string }> = {
  emerald: {
    icon: 'text-emerald-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    dot: 'bg-emerald-400',
  },
  blue: {
    icon: 'text-blue-400',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    dot: 'bg-blue-400',
  },
  red: {
    icon: 'text-red-400',
    border: 'border-red-500/30',
    bg: 'bg-red-500/10',
    dot: 'bg-red-400',
  },
  amber: {
    icon: 'text-amber-400',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    dot: 'bg-amber-400',
  },
  purple: {
    icon: 'text-purple-400',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/10',
    dot: 'bg-purple-400',
  },
}

function WasteCategoryCard({
  icon,
  label,
  items,
  color,
}: {
  icon: React.ReactNode
  label: string
  items: string[]
  color: CardColor
}) {
  const c = colorMap[color]
  return (
    <div className={cn('rounded-xl border p-4', c.bg, c.border)}>
      <div className={cn('mb-3', c.icon)}>{icon}</div>
      <h3 className={cn('font-semibold text-sm mb-3', c.icon)}>{label}</h3>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', c.dot)} />
            <span className="text-slate-300 text-xs">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Navigation ──────────────────────────────────────────────────────────────

const menuItems = [
  { name: 'Features', href: '#features' },
  { name: 'Models', href: '#models' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'About', href: '#about' },
]

const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header>
      <nav data-state={menuState ? 'active' : undefined} className="fixed z-20 w-full px-2 group">
        <div
          className={cn(
            'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
            isScrolled &&
              'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5',
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            {/* Logo */}
            <div className="flex w-full justify-between lg:w-auto">
              <Link href="/" aria-label="home" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-lg font-bold shadow-lg">
                  ♻
                </div>
                <span className="font-bold text-sm hidden sm:block">WasteDetect</span>
              </Link>

              {/* Theme toggle — always visible on mobile, hidden on desktop (shown in CTA row) */}
              <div className="flex items-center gap-1 lg:hidden">
                <ThemeToggle />
                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5"
                >
                  <Menu className="group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                  <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                </button>
              </div>
            </div>

            {/* Desktop nav links */}
            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA buttons */}
            <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-950/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Theme toggle — desktop only (mobile version is next to hamburger) */}
              <ThemeToggle className="hidden lg:flex" />

              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className={cn(isScrolled && 'lg:hidden')}
                >
                  <Link href="#upload">Upload Image</Link>
                </Button>
                <Button asChild size="sm" className={cn(isScrolled && 'lg:hidden')}>
                  <Link href="#camera">Live Camera</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}
                >
                  <Link href="#camera">Try Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
