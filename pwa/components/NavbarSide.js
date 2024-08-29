import React from 'react'

const NavbarSide = () => {
  return (
    <div class="w-2/12 bg-primary-100 h-screen antialiased text-slate-300 selection:bg-white/5 selection:text-primary-100">
    <div class="flex flex-col relative w-screen">
        <div id="menu" class="bg-primary-100 min-h-screen z-10 text-slate-300 w-64 fixed left-0 h-screen">
           <div id="nav" class="w-full px-6">
            <a href="/" class="w-full px-2 inline-flex space-x-6 items-center border-b border-cyan-700 py-3  hover:bg-primary-300 hover:text-cyan-500 transition ease-linear duration-150">
                <div>
                

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="size-10"><path fill="#00808c" d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>


                      
                </div>
                <div class="flex flex-col pt-1">
                    <span class="text-lg font-bold leading-5 text-black">Acceuil</span>
                    
                </div>
            </a>
            <a href="/customers" class="w-full px-2 inline-flex space-x-6 items-center border-b border-cyan-700 py-3 hover:bg-primary-300 hover:text-cyan-500 transition ease-linear duration-150">
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" className='size-10' viewBox="0 0 576 512"><path fill="#00808c" d="M48 0C21.5 0 0 21.5 0 48L0 256l144 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L0 288l0 64 144 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L0 384l0 80c0 26.5 21.5 48 48 48l217.9 0c-6.3-10.2-9.9-22.2-9.9-35.1c0-46.9 25.8-87.8 64-109.2l0-95.9L320 48c0-26.5-21.5-48-48-48L48 0zM152 64l16 0c8.8 0 16 7.2 16 16l0 24 24 0c8.8 0 16 7.2 16 16l0 16c0 8.8-7.2 16-16 16l-24 0 0 24c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-24-24 0c-8.8 0-16-7.2-16-16l0-16c0-8.8 7.2-16 16-16l24 0 0-24c0-8.8 7.2-16 16-16zM512 272a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM288 477.1c0 19.3 15.6 34.9 34.9 34.9l218.2 0c19.3 0 34.9-15.6 34.9-34.9c0-51.4-41.7-93.1-93.1-93.1l-101.8 0c-51.4 0-93.1 41.7-93.1 93.1z"/></svg>
               
                </div>
                <div class="flex flex-col">
                    <span class="text-lg text-black font-bold leading-5 pt-1">Patients</span>
                    <span class="text-sm text-black/50 hidden md:block">La liste des patients.</span>

                </div>
            </a>
            <a href="/orders" class="w-full px-2 inline-flex space-x-6 items-center border-b border-cyan-700 py-3 hover:bg-primary-300 hover:text-cyan-500 transition ease-linear duration-150">
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" className='size-10' viewBox="0 0 384 512"><path fill="#00808c" d="M192 0c-41.8 0-77.4 26.7-90.5 64L64 64C28.7 64 0 92.7 0 128L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-37.5 0C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM305 273L177 401c-9.4 9.4-24.6 9.4-33.9 0L79 337c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L271 239c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                      
                </div>
                <div class="flex flex-col">
                    <span class="text-lg text-black font-bold leading-5 pt-1">Ventes</span>
                    <span class="text-sm text-black/50 hidden md:block">La liste des ventes.</span>
                </div>
            </a>
            <a href="/appareils" class="w-full px-2 inline-flex space-x-6 items-center border-b border-cyan-700 py-3 hover:bg-primary-300 hover:text-cyan-500 transition ease-linear duration-150">
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" className='size-10' viewBox="0 0 384 512"><path fill="#00808c" d="M192 0c-41.8 0-77.4 26.7-90.5 64L64 64C28.7 64 0 92.7 0 128L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-37.5 0C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16z"/></svg>                   
                </div>
                <div class="flex flex-col">
                    <span class="text-lg text-black font-bold leading-5 pt-1">Equipement</span>
                    <span class="text-sm text-black/50 hidden md:block">La liste des équipements.</span>
                </div>
            </a>
            <a href="/centers" class="w-full px-2 inline-flex space-x-6 items-center border-b border-cyan-700 py-3 hover:bg-primary-300 hover:text-cyan-500 transition ease-linear duration-150">
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" className='size-10' viewBox="0 0 640 512"><path fill="#00808c" d="M36.8 192l566.3 0c20.3 0 36.8-16.5 36.8-36.8c0-7.3-2.2-14.4-6.2-20.4L558.2 21.4C549.3 8 534.4 0 518.3 0L121.7 0c-16 0-31 8-39.9 21.4L6.2 134.7c-4 6.1-6.2 13.2-6.2 20.4C0 175.5 16.5 192 36.8 192zM64 224l0 160 0 80c0 26.5 21.5 48 48 48l224 0c26.5 0 48-21.5 48-48l0-80 0-160-64 0 0 160-192 0 0-160-64 0zm448 0l0 256c0 17.7 14.3 32 32 32s32-14.3 32-32l0-256-64 0z"/></svg>                     
                </div>
                <div class="flex flex-col">
                    <span class="text-lg text-black font-bold leading-5 pt-1">Centres</span>
                    <span class="text-sm text-black/50 hidden md:block">La liste des centres.</span>
                </div>
            </a>
            <a href="/insurances" class="w-full px-2 inline-flex space-x-6 items-center border-b border-cyan-700 py-3 hover:bg-primary-300 hover:text-cyan-500 transition ease-linear duration-150">
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" className='size-10' viewBox="0 0 576 512"><path fill="#00808c" d="M543.8 287.6c17 0 32-14 32-32.1c1-9-3-17-11-24L309.5 7c-6-5-14-7-21-7s-15 1-22 8L10 231.5c-7 7-10 15-10 24c0 18 14 32.1 32 32.1l32 0 0 160.4c0 35.3 28.7 64 64 64l320.4 0c35.5 0 64.2-28.8 64-64.3l-.7-160.2 32 0zM256 208c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 48 48 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-48 0 0 48c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-48-48 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l48 0 0-48z"/></svg>                                      
                </div>
                <div class="flex flex-col">
                    <span class="text-lg text-black font-bold leading-5 pt-1">Assurances</span>
                    <span class="text-sm text-black/50 hidden md:block">La liste des assurances.</span>
                </div>
            </a>
            <a href="/users" class="w-full px-2 inline-flex space-x-6 items-center py-3 hover:bg-primary-300 hover:text-cyan-500 transition ease-linear duration-150">
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" className='size-10' viewBox="0 0 448 512"><path fill="#00808c" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1l0 50.8c27.6 7.1 48 32.2 48 62l0 40c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l0-24c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 24c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-40c0-29.8 20.4-54.9 48-62l0-57.1c-6-.6-12.1-.9-18.3-.9l-91.4 0c-6.2 0-12.3 .3-18.3 .9l0 65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7l0-59.1zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>                                      
                </div>
                <div class="flex flex-col">
                    <span class="text-lg text-black font-bold leading-5 pt-1">Utilisateurs</span>
                    <span class="text-sm text-black/50 hidden md:block">La liste des utilisateurs.</span>
                </div>
            </a>
            
           </div>
        </div>
        
      
    </div>
</div>
  )
}

export default NavbarSide