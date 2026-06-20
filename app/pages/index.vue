<template>
  <main class="relative h-screen w-full overflow-hidden">
    <!-- Layer 1: background photo -->
    <NuxtImg
      src="/img/main_backing.jpg"
      alt="Profile picture of Lars van Herk"
      sizes="sm:640px md:1024px lg:1920px"
      class="absolute inset-0 h-full w-full object-cover object-center"/>

    <!-- Layer 2: base text — behind subject -->
    <div class="absolute inset-0 z-10 flex flex-col items-start justify-end">
      <p class="text-[10vw] leading-none text-background indent-6">
        Hi, I'm
      </p>
      <h1 class="text-[35vw] leading-none text-background -mb-6 indent-[0.6rem]">
        Lars.
      </h1>
    </div>

    <!-- Layer 3: subject cutout -->
    <NuxtImg
      src="/img/main_subject.png"
      alt="Profile picture of Lars van Herk"
      sizes="sm:640px md:1024px lg:1920px"
      class="absolute inset-0 z-20 h-full w-full object-cover object-center"/>

    <!-- Layer 4: accent text — masked to subject shape, appears on top of subject -->
    <div
      class="absolute inset-0 z-30 flex flex-col items-start justify-end mask-[url('/img/main_subject.png')] mask-cover mask-center mask-no-repeat">
      <p class="text-[10vw] leading-none text-main opacity-80 indent-6">
        Hi, I'm
      </p>
      <h1 class="text-[35vw] leading-none text-main -mb-6 opacity-80 indent-[0.6rem]">
        Lars.
      </h1>
    </div>
  </main>
</template>
