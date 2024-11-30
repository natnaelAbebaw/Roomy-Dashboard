import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

/*
      SPACING SYSTEM (px)
      2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128
      FONT SIZE SYSTEM (px)
      10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98
      */
/* 

/*
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
<link
  href="https://fonts.googleapis.com/css2?family=Sono:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
*/

/* Colors adapted from https://tailwindcss.com/docs/customizing-colors */

:root {

  --color-brand-50:#F5F2FD ;
  --color-brand-100: #f3f0ff;
  --color-brand-150: #EBE5FC;
  --color-brand-200: #CCBEF7;
  --color-brand-300: #B8A4F4;
  --color-brand-400: #b197fc;
  --color-brand-500: #9775fa;
  --color-brand-600: #845ef7;
  --color-brand-700: #7048e8;
  --color-brand-800: #6741d9;
  --color-brand-900: #5f3dc4;
  --color-brand-1000: #6236E6;
  --color-brand-1100: #5323E4;
  --color-brand-1200: #3C16AF;

  




  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;
  --color-green-100: #dcfce7;
  --color-green-700: #15803d;
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(255, 255, 255, 0.1);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;

  /* For dark mode */
  --image-grayscale: 0;
  --image-opacity: 100%;


&.dark-mode{
  --color-brand-700: #9775fa;
  --color-brand-50:#18212f;
  --color-grey-0: #18212f;
--color-grey-50: #1f2937;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;

--color-blue-100: #075985;
--color-blue-700: #e0f2fe;
--color-green-100: #166534;
--color-green-700: #dcfce7;
--color-yellow-100: #854d0e;
--color-yellow-700: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-indigo-100: #3730a3;
--color-indigo-700: #e0e7ff;

--color-red-100:#b91c1c; 
--color-red-700: #fee2e2;
--color-red-800: #fee2e2;

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
}


}


*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Quicksand", sans-serif;
  color: var(--color-grey-700);
  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  background-color: var(--color-grey-0); 
  line-height: 1.5;
  font-size: 1.6rem;
  overflow: hidden;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
/* button:focus, */
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
}

::-webkit-scrollbar {
  width: 10px;       
  height: 10px;      
}


::-webkit-scrollbar-track {
  background-color: var(--color-grey-200);   
  border-radius: 10px;
}


::-webkit-scrollbar-thumb {
  background-color: var(--color-grey-400);      
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-grey-500);
}




`;

export default GlobalStyle;
