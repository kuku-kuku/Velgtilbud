import { useState } from 'react'
import RotatingText from '@/components/ui/RotatingText'
import LeadForm from '@/components/ui/LeadForm'

export default function Hero() {
  const [choice, setChoice] = useState<'begge' | 'flyttehjelp' | 'rengjoring'>('begge')

  const heading =
    choice === 'rengjoring'
      ? 'Få gratis tilbud på rengjøring'
      : choice === 'flyttehjelp'
      ? 'Få gratis tilbud på flyttehjelp'
      : 'Få gratis tilbud på flytting og rengjøring'

  return (
    <section className="bg-navy relative overflow-hidden min-h-screen flex flex-col justify-center -mt-16">
      {/* Background photo with zoom animation */}
      <div
        className="absolute inset-0 animate-hero-zoom bg-cover bg-no-repeat [background-position:28%_center] sm:[background-position:center_center]"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(14,29,45,0.82) 0%, rgba(14,29,45,0.72) 100%),
            url('/front page.webp')
          `,
        }}
      />

      <div className="container-wide relative z-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-20 items-center">

          {/* Left — copy */}
          <div className="lg:pl-2">
            <p className="text-white/60 text-xs font-semibold uppercase tracking-[0.2em] mb-5">
              Norges uavhengige tilbudstjeneste for flytting og renhold
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6">
              Vi finner det beste flytte- eller
              <br className="hidden md:block" />{' '}rengjøringstilbudet for deg
            </h1>

            <div className="min-h-[1.6rem] mb-4">
              <RotatingText className="text-white text-lg font-medium" />
            </div>

            <p className="text-white/80 text-base leading-relaxed mb-4 max-w-md">
              Slipp å kontakte flere bedrifter selv. Våre meglere innhenter, vurderer og sammenligner tilbud fra seriøse flytte- og rengjøringsbedrifter over hele Norge – slik at du får den beste løsningen tilpasset dine behov.
            </p>

            <p className="text-white/70 text-base leading-relaxed mb-10 max-w-md">
              Du forteller oss hva du trenger, og vi tar oss av resten. Din personlige kontaktperson følger deg gjennom hele prosessen – fra første henvendelse til oppdraget er utført og fakturaen er betalt.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { title: 'Norsk kundeservice',              desc: 'Du forholder deg kun til én rådgiver gjennom hele prosessen.' },
                { title: 'Kun kvalitetssikrede bedrifter',  desc: 'Vi vurderer pris, kvalitet, kundeanmeldelser, erfaring og service før vi anbefaler de beste alternativene.' },
                { title: 'Spar tid og penger',              desc: 'Vi forhandler og sammenligner tilbudene for deg – helt kostnadsfritt og uten forpliktelser.' },
              ].map(({ title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-sand flex-shrink-0 mt-1.5" />
                  <div>
                    <p className="text-sm font-bold text-white uppercase tracking-wide leading-none mb-0.5">{title}</p>
                    <p className="text-sm text-white/50">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            <div id="hero-form" className="bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/30 px-4 sm:px-7 py-8">
              <p className="text-xs font-semibold text-greige uppercase tracking-widest mb-1">Gratis tilbud</p>
              <h2 className="text-xl font-bold text-navy mb-6">{heading}</h2>
              <LeadForm defaultService="flytting" defaultServiceChoice="begge" onServiceChoiceChange={setChoice} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
