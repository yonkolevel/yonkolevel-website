import React from 'react';


interface Props {
  color?: keyof typeof customTheme.colors;
}
const a = customTheme.colors['yellow'];

const BlogPixelBottom: React.FunctionComponent<Props> = ({
  color = 'blue5',
}) => {
  const actualColor = customTheme.colors[color];
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='100%'
      height='90'
      fill='none'
    >
      <path
        fill={actualColor}
        d='M255 45H270V60H255z'
        transform='rotate(-180 255 45)'
      ></path>
      <path
        fill={actualColor}
        d='M255 15H270V30H255z'
        transform='rotate(-180 255 15)'
      ></path>
      <path
        fill={actualColor}
        d='M375 15H390V30H375z'
        transform='rotate(-180 375 15)'
      ></path>
      <path
        fill={actualColor}
        d='M390 15H405V30H390z'
        transform='rotate(-180 390 15)'
      ></path>
      <path
        fill={actualColor}
        d='M405 15H420V30H405z'
        transform='rotate(-180 405 15)'
      ></path>
      <path
        fill={actualColor}
        d='M375 30H390V45H375z'
        transform='rotate(-180 375 30)'
      ></path>
      <path
        fill={actualColor}
        d='M390 30H405V45H390z'
        transform='rotate(-180 390 30)'
      ></path>
      <path
        fill={actualColor}
        d='M375 45H390V60H375z'
        transform='rotate(-180 375 45)'
      ></path>
      <path
        fill={actualColor}
        d='M255 75H270V90H255z'
        transform='rotate(-180 255 75)'
      ></path>
      <path
        fill={actualColor}
        d='M60 15H75V30H60z'
        transform='rotate(-180 60 15)'
      ></path>
      <path
        fill={actualColor}
        d='M45 30H60V45H45z'
        transform='rotate(-180 45 30)'
      ></path>
      <path
        fill={actualColor}
        d='M45 15H60V30H45z'
        transform='rotate(-180 45 15)'
      ></path>
      <path
        fill={actualColor}
        d='M135 15H150V30H135z'
        transform='rotate(-180 135 15)'
      ></path>
      <path
        fill={actualColor}
        d='M285 75H300V90H285z'
        transform='rotate(-180 285 75)'
      ></path>
      <path
        fill={actualColor}
        d='M90 15H105V30H90z'
        transform='rotate(-180 90 15)'
      ></path>
      <path
        fill={actualColor}
        d='M75 15H90V30H75z'
        transform='rotate(-180 75 15)'
      ></path>
      <path
        fill={actualColor}
        d='M225 45H240V60H225z'
        transform='rotate(-180 225 45)'
      ></path>
      <path
        fill={actualColor}
        d='M240 30H270V60H240z'
        transform='rotate(-180 240 30)'
      ></path>
      <path
        fill={actualColor}
        d='M195 45H210V60H195z'
        transform='rotate(-180 195 45)'
      ></path>
      <path
        fill={actualColor}
        d='M210 30H240V60H210z'
        transform='rotate(-180 210 30)'
      ></path>
      <path
        fill={actualColor}
        d='M180 30H210V60H180z'
        transform='rotate(-180 180 30)'
      ></path>
      <path
        fill={actualColor}
        d='M105 45H120V60H105z'
        transform='rotate(-180 105 45)'
      ></path>
      <path
        fill={actualColor}
        d='M120 30H150V60H120z'
        transform='rotate(-180 120 30)'
      ></path>
      <path
        fill={actualColor}
        d='M30 30H60V60H30z'
        transform='rotate(-180 30 30)'
      ></path>
      <path
        fill={actualColor}
        d='M30 45H45V60H30z'
        transform='rotate(-180 30 45)'
      ></path>
      <path
        fill={actualColor}
        d='M1336 60H1396V120H1336z'
        transform='rotate(-180 1336 60)'
      ></path>
      <path
        fill={actualColor}
        d='M360 60H420V120H360z'
        transform='rotate(-180 360 60)'
      ></path>
      <path
        fill={actualColor}
        d='M1276 30H1306V60H1276z'
        transform='rotate(-180 1276 30)'
      ></path>
      <path
        fill={actualColor}
        d='M546 30H576V60H546z'
        transform='rotate(-180 546 30)'
      ></path>
      <path
        fill={actualColor}
        d='M1180 30H1210V60H1180z'
        transform='rotate(-180 1180 30)'
      ></path>
      <path
        fill={actualColor}
        d='M450 30H480V60H450z'
        transform='rotate(-180 450 30)'
      ></path>
      <path
        fill={actualColor}
        d='M300 30H330V60H300z'
        transform='rotate(-180 300 30)'
      ></path>
      <path
        fill={actualColor}
        d='M979 30H1009V60H979z'
        transform='rotate(-180 979 30)'
      ></path>
      <path
        fill={actualColor}
        d='M1054 30H1084V60H1054z'
        transform='rotate(-180 1054 30)'
      ></path>
      <path
        fill={actualColor}
        d='M1351 15H1366V30H1351z'
        transform='rotate(-180 1351 15)'
      ></path>
      <path
        fill={actualColor}
        d='M1380 45H1395V60H1380z'
        transform='rotate(-180 1380 45)'
      ></path>
      <path
        fill={actualColor}
        d='M657 45H672V60H657z'
        transform='rotate(-180 657 45)'
      ></path>
      <path
        fill={actualColor}
        d='M1351 30H1366V45H1351z'
        transform='rotate(-180 1351 30)'
      ></path>
      <path
        fill={actualColor}
        d='M590 30H605V45H590z'
        transform='rotate(-180 590 30)'
      ></path>
      <path
        fill={actualColor}
        d='M576 45H591V60H576z'
        transform='rotate(-180 576 45)'
      ></path>
      <path
        fill={actualColor}
        d='M606 15H621V30H606z'
        transform='rotate(-180 606 15)'
      ></path>
      <path
        fill={actualColor}
        d='M1365 15H1380V30H1365z'
        transform='rotate(-180 1365 15)'
      ></path>
      <path
        fill={actualColor}
        d='M1365 60H1380V75H1365z'
        transform='rotate(-180 1365 60)'
      ></path>
      <path
        fill={actualColor}
        d='M642 60H657V75H642z'
        transform='rotate(-180 642 60)'
      ></path>
      <path
        fill={actualColor}
        d='M1262 60H1277V75H1262z'
        transform='rotate(-180 1262 60)'
      ></path>
      <path
        fill={actualColor}
        d='M532 60H547V75H532z'
        transform='rotate(-180 532 60)'
      ></path>
      <path
        fill={actualColor}
        d='M1306 75H1321V90H1306z'
        transform='rotate(-180 1306 75)'
      ></path>
      <path
        fill={actualColor}
        d='M465 15H480V30H465z'
        transform='rotate(-180 465 15)'
      ></path>
      <path
        fill={actualColor}
        d='M480 15H495V30H480z'
        transform='rotate(-180 480 15)'
      ></path>
      <path
        fill={actualColor}
        d='M345 75H360V90H345z'
        transform='rotate(-180 345 75)'
      ></path>
      <path
        fill={actualColor}
        d='M1380 15H1395V30H1380z'
        transform='rotate(-180 1380 15)'
      ></path>
      <path
        fill={actualColor}
        d='M1276 45H1291V60H1276z'
        transform='rotate(-180 1276 45)'
      ></path>
      <path
        fill={actualColor}
        d='M546 45H561V60H546z'
        transform='rotate(-180 546 45)'
      ></path>
      <path
        fill={actualColor}
        d='M1165 45H1180V60H1165z'
        transform='rotate(-180 1165 45)'
      ></path>
      <path
        fill={actualColor}
        d='M450 45H465V60H450z'
        transform='rotate(-180 450 45)'
      ></path>
      <path
        fill={actualColor}
        d='M1195 30H1210V45H1195z'
        transform='rotate(-180 1195 30)'
      ></path>
      <path
        fill={actualColor}
        d='M465 30H480V45H465z'
        transform='rotate(-180 465 30)'
      ></path>
      <path
        fill={actualColor}
        d='M1150 15H1165V30H1150z'
        transform='rotate(-180 1150 15)'
      ></path>
      <path
        fill={actualColor}
        d='M1195 15H1210V30H1195z'
        transform='rotate(-180 1195 15)'
      ></path>
      <path
        fill={actualColor}
        d='M300 45H315V60H300z'
        transform='rotate(-180 300 45)'
      ></path>
      <path
        fill={actualColor}
        d='M747 0H777V30H747z'
        transform='rotate(90 747 0)'
      ></path>
      <path
        fill={actualColor}
        d='M576 0H606V30H576z'
        transform='rotate(90 576 0)'
      ></path>
      <path
        fill={actualColor}
        d='M762 0H777V15H762z'
        transform='rotate(90 762 0)'
      ></path>
      <path
        fill={actualColor}
        d='M591 0H606V15H591z'
        transform='rotate(90 591 0)'
      ></path>
      <path
        fill={actualColor}
        d='M1425 45H1440V60H1425z'
        transform='rotate(-180 1425 45)'
      ></path>
      <path
        fill={actualColor}
        d='M695 45H710V60H695z'
        transform='rotate(-180 695 45)'
      ></path>
      <path
        fill={actualColor}
        d='M1084 15H1099V30H1084z'
        transform='rotate(-180 1084 15)'
      ></path>
      <path
        fill={actualColor}
        d='M1246 15H1261V30H1246z'
        transform='rotate(-180 1246 15)'
      ></path>
      <path
        fill={actualColor}
        d='M1069 30H1084V45H1069z'
        transform='rotate(-180 1069 30)'
      ></path>
      <path
        fill={actualColor}
        d='M1084 45H1099V60H1084z'
        transform='rotate(-180 1084 45)'
      ></path>
      <path
        fill={actualColor}
        d='M1114 15H1129V30H1114z'
        transform='rotate(-180 1114 15)'
      ></path>
      <path
        fill={actualColor}
        d='M1069 75H1084V90H1069z'
        transform='rotate(-180 1069 75)'
      ></path>
      <path
        fill={actualColor}
        d='M889 15H904V30H889z'
        transform='rotate(-180 889 15)'
      ></path>
      <path
        fill={actualColor}
        d='M874 15H889V30H874z'
        transform='rotate(-180 874 15)'
      ></path>
      <path
        fill={actualColor}
        d='M949 15H964V30H949z'
        transform='rotate(-180 949 15)'
      ></path>
      <path
        fill={actualColor}
        d='M964 45H979V60H964z'
        transform='rotate(-180 964 45)'
      ></path>
      <path
        fill={actualColor}
        d='M994 15H1009V30H994z'
        transform='rotate(-180 994 15)'
      ></path>
      <path
        fill={actualColor}
        d='M1084 90H1099V105H1084z'
        transform='rotate(-180 1084 90)'
      ></path>
      <path
        fill={actualColor}
        d='M904 30H919V45H904z'
        transform='rotate(-180 904 30)'
      ></path>
      <path
        fill={actualColor}
        d='M859 30H874V45H859z'
        transform='rotate(-180 859 30)'
      ></path>
      <path
        fill={actualColor}
        d='M844 45H859V60H844z'
        transform='rotate(-180 844 45)'
      ></path>
      <path
        fill={actualColor}
        d='M874 45H889V60H874z'
        transform='rotate(-180 874 45)'
      ></path>
      <path
        fill={actualColor}
        d='M859 15H874V30H859z'
        transform='rotate(-180 859 15)'
      ></path>
      <path
        fill={actualColor}
        d='M844 15H859V30H844z'
        transform='rotate(-180 844 15)'
      ></path>
      <path
        fill={actualColor}
        d='M934 30H949V45H934z'
        transform='rotate(-180 934 30)'
      ></path>
      <path
        fill={actualColor}
        d='M1024 15H1039V30H1024z'
        transform='rotate(-180 1024 15)'
      ></path>
      <path
        fill={actualColor}
        d='M1009 15H1024V30H1009z'
        transform='rotate(-180 1009 15)'
      ></path>
      <path
        fill={actualColor}
        d='M1054 45H1069V60H1054z'
        transform='rotate(-180 1054 45)'
      ></path>
      <path
        fill={actualColor}
        d='M1069 15H1084V30H1069z'
        transform='rotate(-180 1069 15)'
      ></path>
      <path
        fill={actualColor}
        d='M1440 30H1470V60H1440z'
        transform='rotate(-180 1440 30)'
      ></path>
      <path
        fill={actualColor}
        d='M717 30H747V60H717z'
        transform='rotate(-180 717 30)'
      ></path>
      <path
        fill={actualColor}
        d='M1410 30H1440V60H1410z'
        transform='rotate(-180 1410 30)'
      ></path>
      <path
        fill={actualColor}
        d='M687 30H717V60H687z'
        transform='rotate(-180 687 30)'
      ></path>
    </svg>
  );
};

export default BlogPixelBottom;
