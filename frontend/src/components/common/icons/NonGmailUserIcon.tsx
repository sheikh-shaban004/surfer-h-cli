import React from 'react';

interface NonGmailUserIconProps extends React.SVGProps<SVGSVGElement> {}

const NonGmailUserIcon: React.FC<NonGmailUserIconProps> = (props) => (
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Gradient" clipPath="url(#clip0_4539_11064)">
<rect width="20" height="20" fill="black"/>
<g id="Ellipse 129" filter="url(#filter0_f_4539_11064)">
<circle cx="17" cy="12" r="12" fill="#F20000"/>
</g>
<g id="Ellipse 130" filter="url(#filter1_f_4539_11064)">
<circle cx="11" cy="3" r="12" fill="#FFB01B"/>
</g>
</g>
<defs>
<filter id="filter0_f_4539_11064" x="-5" y="-10" width="44" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_4539_11064"/>
</filter>
<filter id="filter1_f_4539_11064" x="-11" y="-19" width="44" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_4539_11064"/>
</filter>
<clipPath id="clip0_4539_11064">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

);

export default NonGmailUserIcon;
