<script>
	import { onMount } from "svelte";
	let links;

	onMount(() => {
		const sections = new Map();
		
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					sections.set(entry.target.id, entry.isIntersecting);
				});
				
				// Encuentra la primera sección visible
				const visibleSections = Array.from(sections.entries())
					.filter(([_, isVisible]) => isVisible);
				
				if (visibleSections.length > 0) {
					const currentSection = visibleSections[0][0];
					updateActiveLink(currentSection);
				}
			},
			{ 
				threshold: [0, 0.25, 0.5, 0.75, 1],
				rootMargin: "-100px 0px -66% 0px"
			},
		);

		function updateActiveLink(sectionId) {
			links.forEach((link) => {
				const href = link.getAttribute("href");
				if (href === `#${sectionId}`) {
					link.classList.add("active");
				} else {
					link.classList.remove("active");
				}
			});
		}

		const allSections = document.querySelectorAll("section[id]");
		allSections.forEach((section) => {
			sections.set(section.id, false);
			observer.observe(section);
		});

		links = document.querySelectorAll(".nav a");
		
		// Cleanup
		return () => {
			observer.disconnect();
		};
	});
</script>

<nav class="nav hidden lg:block" aria-label="In-page jump links">
	<ul class="mt-16 w-max">
		<li>
			<a class="group flex items-center py-3" href="#about"
				><span
					class="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"
				></span><span
					class="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200"
					>Acerca de mi</span
				>
			</a>
		</li>
		<li>
			<a class="group flex items-center py-3" href="#experience"
				><span
					class="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"
				></span><span
					class="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200"
					>Experiencia</span
				>
			</a>
		</li>
		<li>
			<a class="group flex items-center py-3" href="#projects"
				><span
					class="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"
				></span><span
					class="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200"
					>Proyectos</span
				>
			</a>
		</li>
		<li>
			<a class="group flex items-center py-3" href="#contenido"
				><span
					class="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"
				></span><span
					class="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200"
					>Contenido</span
				>
			</a>
		</li>
	</ul>
</nav>
