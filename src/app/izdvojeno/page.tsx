'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const containerStagger = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.15, delayChildren: 0.1 },
	},
};

const fadeUp = {
	hidden: { opacity: 0, y: 18 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardFadeUp = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const featuredCatalogs = [
	{ name: 'Mercator', img: '/vercel.svg' },
	{ name: 'Bingo', img: '/vercel.svg' },
	{ name: 'Konzum', img: '/vercel.svg' },
];

export default function IzdvojenoPage() {
	return (
		<>
			{/* Hero Section */}
			<section className="relative overflow-hidden">
				<div className="bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
						<motion.div
							initial="hidden"
							animate="show"
							variants={containerStagger}
							className="text-center"
						>
							<motion.h1
								variants={fadeUp}
								className="text-4xl sm:text-5xl font-extrabold text-gray-900 drop-shadow-sm"
							>
								Izdvojeni katalozi
							</motion.h1>

							<motion.p
								variants={fadeUp}
								className="mt-4 text-lg sm:text-xl text-gray-800 max-w-3xl mx-auto"
							>
								Ovdje se nalaze katalozi koji imaju premium vidljivost. Želite da i vaš katalog bude ovdje? Istaknite ga već danas!
							</motion.p>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Featured Grid */}
			<section className="py-12 sm:py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, amount: 0.2 }}
						variants={containerStagger}
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
					>
						{featuredCatalogs.map((catalog) => (
							<motion.div
								key={catalog.name}
								variants={cardFadeUp}
								whileHover={{ scale: 1.03 }}
								className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-amber-100 p-6 sm:p-8"
							>
								<span className="absolute top-3 right-3 inline-flex items-center rounded-full bg-yellow-400 text-yellow-950 text-xs font-semibold px-2.5 py-1 shadow-sm">
									Featured
								</span>
								<div className="aspect-video w-full relative rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 mb-5 flex items-center justify-center">
									<Image src={catalog.img} alt={catalog.name} width={160} height={80} className="opacity-80" />
								</div>
								<div className="flex items-center justify-between">
									<div>
										<h3 className="text-xl font-bold text-gray-900">{catalog.name}</h3>
										<p className="text-sm text-gray-600">Premium katalog</p>
									</div>
									<button className="ml-4 inline-flex items-center rounded-lg bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105 shadow">
										Pogledaj
									</button>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-12 sm:py-16">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
					<motion.h2
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, ease: 'easeOut' }}
						className="text-2xl sm:text-3xl font-extrabold text-blue-900"
					>
						Želite da vaš katalog bude u izdvojenom dijelu?
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
						className="mt-3 text-base sm:text-lg text-blue-700"
					>
						Kontaktirajte nas i istaknite vaš katalog danas. popusti.ba
					</motion.p>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.98 }}
						className="mt-6 inline-flex items-center rounded-xl bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 text-base font-semibold transition-colors duration-200 shadow"
					>
						Postavi katalog u izdvojeno
					</motion.button>
				</div>
			</section>
		</>
	);
}


