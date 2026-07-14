import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Happy 3 Months",
}

const letter = `Hi Neo,
I'm about to land back in San Francisco from the trip to Maui, and I wanted to thank you as well, thank you for this trip, thank you for the time you've sacrificed to be with me, thank you for opening your home to me, thank you for loving me, and thank you for being my biggest supporter.
This morning I woke up 90 minutes before our alarm to the sound of the birds outside (loud asf tbh) and just stared at you with the ocean behind you, and thought about how grateful I am for these last 3 months (and 2 days) with you.
So much has changed since you asked me to be your girlfriend. There have been lots of ups and downs for me in such a short period of time, but I have never been so happy or so sure of something. It became so clear on this trip how comfortable and open I am with you now, like being around you is just an extension of myself. I don't feel like I have to put on an act or try to impress you anymore. Everything I do and say feels completely natural, and you put my mind at ease when I am near you.
I also wanted to thank you for being so incredibly patient with me. I love that we take our time together and give each other grace when something goes wrong. I tend to be anxious when things don't work out, but when I'm with you I know it's going to be okay and that we will figure something out together.
I loved laughing with you this weekend. You are so so so silly, and I am so happy that we are starting to have our own inside jokes and remember all the little details about each other. I've never seen anything as beautiful as what you've shown me this weekend, besides when we met in person for the first time (ofc! (: ).
This was one of the best weekends of my life. After this trip, I am convinced there is no better human experience than being in a beautiful place with someone you love. Our first trip together! I can't wait to turn more pages of our book with you.
Finally, I wanted to thank you for giving me the type of feeling in my chest that makes me want to be next to you and to care for you for the rest of my life, plz keep doing that.
I love you, here's to more adventures. :-)
Love,
Your sugar sweet baby beautiful girlfriend`

export default function HappyThreeMonthsPage() {
  const paragraphs = letter.split("\n").filter(Boolean)
  const signatureLines = ["Love,", "Your sugar sweet baby beautiful girlfriend"]

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <article className="rounded-2xl border border-black/10 bg-white p-5 text-neutral-900 shadow-sm sm:p-8">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900 sm:mb-8 sm:text-3xl">
          Happy 3 Months
        </h1>
        <div className="space-y-4 text-sm leading-7 text-neutral-800 sm:space-y-5 sm:text-base sm:leading-8">
          {paragraphs.map((paragraph, index) => {
            if (signatureLines.includes(paragraph)) {
              return (
                <p
                  key={index}
                  className="pt-2 text-base font-medium text-neutral-900 sm:text-lg"
                >
                  {paragraph}
                </p>
              )
            }

            return <p key={index}>{paragraph}</p>
          })}
        </div>
        <figure className="mt-8 border-t border-black/10 pt-5 text-center text-xs italic leading-5 text-neutral-500 sm:text-sm">
          <blockquote>
            “Being deeply loved by someone gives you strength, while loving
            someone deeply gives you courage.”
          </blockquote>
          <figcaption className="mt-2">Lao Tzu</figcaption>
        </figure>
      </article>
    </main>
  )
}
