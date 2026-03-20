import React, { useState } from 'react';
import logoJorge from './assets/image.png'; // Tu logo oficial

const unidades = [
  { 
    id: 1, 
    marca: "TOYOTA", 
    modelo: "Hilux 2.8 SRX 4x4", 
    anio: 2023, 
    precio: "u$s 44.500", 
    categoria: "Camionetas",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiKquU_TOGhefoqctLLwIN6HYlzaNLUtqdFg&s"
  },
  { 
    id: 2, 
    marca: "HONDA", 
    modelo: "CB300F Twister", 
    anio: 2024, 
    precio: "$ 6.200.000", 
    categoria: "Motos",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP0dAVJfcEfJtZAFdCWkrqC3qGAUAzhbWhQw&s"
  },
  { 
    id: 3, 
    marca: "VOLKSWAGEN", 
    modelo: "Amarok V6 Extreme", 
    anio: 2022, 
    precio: "u$s 39.000", 
    categoria: "Camionetas",
    img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSExIWFRUXFRcXFhcYFRcXGBgVFhcXFxcWFxUYHSggHxolGxUXITEiJykrLi4uGB8zODMsNygtLisBCgoKDg0NFQ0PFSsZFRk3NysrKysrKy0tLS03Nzc3Kys3LS0rLSsrLSs1KystKywrNysrNzcrKzArKysrNy04Lf/AABEIAKcBLQMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABAUDBgECBwj/xABLEAABAwIDAwgFCQYEAwkAAAABAAIDBBESITEFBkETIlFhcYGRoQcyscHRFEJDUlNygpLwIzNissLhFaLS8RZEkwgXVFVjg6Oz0//EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABkRAQEBAQEBAAAAAAAAAAAAAAARAQJxEv/aAAwDAQACEQMRAD8A9xREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEXR0rRqQO8LE6tiGsjB+IfFBIRQztSAfTR/nb8V0/xqm+3j/MEE9FVu3gpQbcqD2BxHiBZdm7dpz9J/lf8EFkihN2rCfpB5j3LKK6L7Rv5ggkIsTahh0e0/iCygoCIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgLDVVTI24nuDR7eoAZk9QVVtneFsV2Ms54yP1WH+K2p/hHeRcLTKuskmcSXXPEk6DoAGg6giVstfvkxt8DL9bja/WGi5t22PUtd2hvzUn1Cxg6mEnxc63koL6dg1uT228goU7Y/qN7wD7VBFrd7Kx2tXKPuljfY2612u27OfWqJz2yPTeadjHNLcnEG4GQwjq6SfYVr1JUcq8Ok/dMIx9VwcN+NiRZUZqjapOsr+97z71Bl2mftXeLlfx7SpZHBgDbnS8dr9QJCxbSoYyGsjhjxvcAOYBZoN3EkC4Fhr1oK3ZTqid+GOR1h6ziXYWjpJPs4+K2iCSOnFgXSO4veSfBnqtHienpWCzKaPk2W4lxt6zuJPUOjsHA3pJZi83/X+6K2N28T/reeH+QLr/AMQSfWd/1ZfiqSjlDHXcwPH1TotvpIIXsDhG0Bw0wi/QRoiK0bblvYuOWlpZTcH8XSuDvFUA2Dv/AJJj/UqmUWcB1Fo/Cf7ra9iyYom9WXhp5EIK5m8laNHjv5U+1ykRb61cebySLgXaGjM21xAm2fSpEu2Ymki5NugZeKgbWY2YB7dHMc3rBYdO2znH8IQbHDv5Uwyte55fE+zXtPzHH1JG3vZpza5pyBAI439G3d3iZU83R9tOnp718+UcvKxujfqLxv6r+q7uIB7WlX+6O1JbsLb8o04SBrjZr7FVfQKKv2FtRtTCJBkdHj6rhqPf3qwUBERAREQEREBERAREQEREBEXBNkHKLC+rjGrx4qNJtiEfPCCc5wAucgNVqW3d48QLIXFrOLxkXfcPBv8AFqeFsiY+81e+YWjmjDB9G7E0OPS97bkjobYDpvlbRtoN2gSbOoiOH7SYHwwe9EXbgSAcPN4C+HLw0XR0tszbSwA0A6AtYfVbTxDGabDfMMks63UXNtfuWKaplLm4jIG87GBPAXac3AcIGt73CQi9qKlVs06raqN7v3YqD1meL+mIqoOydonj4yFFUe8G0ccj3A5Xwjsbl7bnvXOyJw2FxdfnvsAP4ALnxd5K1i3KnPrmNvZif5EAKazdgMyfO49DWRtae4En2IjUqlp5RpY05EEZHUOFvOy3Rh5IGR/7x3DXA3UNHZqek9ywywQwAOwvc8aEu0PVhAz61S1FYXXe4m1she51HSqqTNUY7knILmjjLxiAaG6Avdhv2AAk+CqG1jHDIOAvzswTbq0WSqkBAwiS1ubmPcoNjloQG4g4E8Rne3SL6jPzVzR1gjiJ1OLIXtqBr5rT93ZpGuLXNuHAtGJ3q3tid22C2FzwXEueLnU3AREKtbzmOta7jl0Yhew8Fd7EJ5KUDUAkdtiPcFV7QaHCMM5xEjb2zysblTIGvbmMQz4Bw6+CCG2FWVCy0Zvo2RhPZJeJ3k7yWPCT81/5HfBJI3YSA1+Y+qdeHmoNflHJVmE+rILeIvfxuO9WWz3GOpeAbFzWzN+8Dhf/AJm3Ta9OzEZ3ixaAGAnO4ucVh1nyWWsjImgeL+s9psD6r2YuA6WuVVvW5m33RVB5Q8yV1n8AHE5OtwsT4Er1ZfP4lPQfCQ/0rcKL0gTsY1hix4QBiLJcRtlckDVUeoIvOm+kaTjTHuZN/pWVnpGdxpn90c3+hQegItFi9Igvzqaa3VFN/wDmtzoapssbZGggOAIDmlrhfgWnMFBnREQEREBEULbO0W00Ek7tI2F1ukjQd5sEEXbm8lNSD9tIA4i4YM3EdNhoO1aXtH0tRNyihcet3wXmddt+tle6WahJc55JL45/V4GwPYLLtseepqpWQsoYWlxN3OZMGtaLm5PEm2QGaDZ630sVDvVZbyVHVekWrd/uq/eEzU7mYYaaWN5cGPYJM8DsLzhvoHZXzB4XVLJWym/7GMAaWjmz7Bb22QWs++9UePmoUu9tSfnearHyzm37JtzwwPy7TousIkc+2BuIZ2EbnH8pKC3/AMRrDHyrjgj0D3XAN/qgZnttbrUX/E53eqZH9jSPIX9qnOmrQWtd8qu4XaOTay/Zdh6CdeCw0dbJLrLMG3Avyzzr0NaWi9s7XHBBHMlWfo5c/wD03G/5gVJp21ZyDJx4xjyAUvac0NPIzDLUOIHPL3OyJtdobyjsum/R0qQ/aWQc12IHTjdUdYtmVB9d+Htme73qQzZjR60x7ifeVzDS1MuYAaOlzreQuVIG7kh9edo7Gk+dwg5jkiZ895/GQs7NvRsFmtHebqP/AMNx8Ziexo95K4dsSIaSHvY0+yyBUbejdqxh7lQbfkY9reTjANzfCDx0Vo0sbLyLgCcOIODSBh4ki5sAcr3VvWQRm2CPBbDfnF1ziGfO0QaFsmNzHEOp8bXa4mHKwOitI6GK9xTuHVjeB4YrLaRSBZGUoQUdMHM9SFrfC/ic1JbLUcAB3/BXLYAsrYQgpQ2pPzmjvPwXb5LPexeB4qPvPsuaRzXMdC9rdI5LNDSQLuxXzvYZK1j2hEwN5WoiLg04iHAC925WLj1+CCINnzHWXy/uu42W/jIfD+6ku2/SD6dncb+xYXb10Y+lJ7GPPuQRq2ihiwune4gusBhLgTrmGgm3kpu0YC0sINjykYBHDEXMPk8qh27tahqLOxzseLDHGLHDnzecbcddV2l3og/ZMjjkDGyMc4usXEMJdlzjdxNtT0oNk+RzE5TO713jopTe8r8j09/vWu1+8DpHloe6NvANyPe4G9+w29q6U87BcyWcDmC+x4Z5uPYg2kUL/tH+K7Cid9o/xVHT7So7i4gHYWNPiDdXVTtOKma173kwPHMfzpC141YXC5IIzBNzk4E6IM7aN32j/Fb3uNUHA6JzibZtuc+sexeYv35oho57uyNw/msrf0f75io2hHDHGWscHAl1sRLY5H6C4A5o49Km7GuOfrZ69hRERkREQFoPpi2nHHRGF7yzlLXdmcIuALgZnnG9hnZjlvy8f3yp4qmeR7y8jFYDELWbkOaQehB53tPanKuDxtlkXNa0MjZWwss0WvhbEczqTfVbZuJWN+T1OOvNWQTm2aYGJjoZGh55drCBiJzaDnhum7u4rK5kkjJCxscjo+c7XASCbgac1Z6v0Rv15Vp7S722KDQ63aUs8l46+OmbE3BGOUljAabEtj5Jp5gs0Z64QuHTVP8A540jqqaryGBWW39xjRtDnlrgXYRZ3GxP1epapI6MfRf5v7ILOSpnDS47V5Q8GtnqSTn0loHiVtu6u0KWmicZJnGeTNx5OSXTJoL8gcs/W1K87dMzhGPH+y5bUnRsbfy3QbrtbbDJXOx1Ly0tw82JjHAWtk6SU2yJGQ0KrtnCmYOZy8gDsVjyZZiAtc4Y3DTLMgKjhZUHNrA38LB/MpE9HVSZSTNt0Om5o/CLgIIdfUY3k3vmePibqdsasZCedqePAfDK3BV9TRujPOdG77kjXeQN/JYG3cQOJNu8oN5dttsQuOdfMAaeKrare6TQYG9puVru258No2mwAz7FXNHBBskm80p+kHc34hYjt6b7S/4R8FSsXLzY34HVBuu7O8QMrWShvO5ofwufmuB4HRZtv7alppHQBjS0ZtLr3LDm3jwGXctCik51jocvgth2/tU1IicW2eyMMcfrOGrupUSH72VB0wDsb8So795ao/S27GtHuVQSuMSgsX7aqDrM/wDNb2KO+skOsjz2vcfaVFxLgyBBkJuubrHHd3qgu7AT7FLi2bUO9WCU/wDtv+CCPdLqwbu7WH/l3d5Y3+ZwUhm6VWdRG370rf6boKa6yxOsb9GfmFexblzn1poW9he7+lQNp7JfCSwOD7NY8kAjI3yse9Udaqts3GMifEdnWqh1cTnbxzPis1aeaG/r9XJUOOkkd6rb9ig7Grd1eCudlbVPyeeB3qPDXNHBsrXAhw6Ltxg/h6FUS056CD0HJKI4XZi/SNL2zt4XQSC9b/6Eow/acRz5jZHZAkfu3M51hkOfqbZ26bHDJvBsxh5tPGSOLaVgv+ay2Dcff+mZVxsbTlplc2HFgjZYSPY35hNwHFpt1FNxrnqbXuiIiMiIiAvnbfXakjZq0slsW1T2xgG4DWvsQGgHjiGnsX0Svm3ePadcKydrorRfKZQ0GBp/Z8o6xuRYi2eK9+rigsvRzv8AU1HSzwVnKuc+Vz7sjFsDg29y0jMuxnK+vcLyp9IOx3XGOobiFrcm8aG9xlrrn1rzSv2tIHub8np3NDrAugAFr8cJz7Qoj9qjK9LAcvmscLd17eaDat/98qWeCJlJIXuZILh7Hjmhjm3JIAvey8/krHO1De4f3t5qdJtKI5/JWdoe63noulTPGA08k2zhe2IG3dxQYJY7LLRU7HPDXvLGniG4iDwuL6di5groibSRmx0LTZw7Acj2EDtUuaisOUjcJI/rtBGE9D26tKCc3deC1jK8vOYwxhzCM78/FkbC+nHVQa3YjI2OeHEgAYDZtnFxIAI4aX7FHJP1j4/orDM4nUnxPxQYHZKTstl5L/VBPfoPb5KI8qXROwxyO46DuHxKCPO3G4nW5/sFLgomgXdp+vFY6NlypFVMQQQOFxloOrrQZwYtDET14QPco1RQNLS+PMcW8R/Zdp3Dlg4cS0+xd4Znco5zc7Enuvoe5BS4RrZWtHAJDhL2xi2LE7IAAXUTasAbJdvquAcOq+o7jdcwC7exp8rhBet2PRD164O+4WD3uXfktlt1e9/fJ/Q0LWw2/Bd207jwQbINo7Nb6sAd2xud/wDYV3ZvRTM9SmI7I4m+wla2KXpc0drguwp28ZG+N/Yg2J++zvmxO75LeQao0m98pzEbe97neyyp+Ti+v4NK5tF/GewD3lBPdvVUnhEOxjve4rC/eOqP0oHYyP3tKjHk/qPPaQFjc0HRh8b+5BIftqqOtRJ3HD/LZZqGqcAXvc5x4Fzi42Ggue1VrhbVduUsOoIO0bMb/wBfrVWhmwgtYbWbc2tcgdHQFXbO4noHmTZZ3Webxg3wuu3XINOY6rBB3llxtAcbki7XWzab2sekXCqSbPbfpt7lYsLQOdmcNmjovx81Arsn4uw+wlBJkiJfhAu46AZk9gGa270Wbuy1G0YjybuThlD5XFpAYYSXBrrjJxkDRh1yJ4L6K2VsimgaOQgjiBA9VgBPa4Zk9ZU5jAMgABmchbM5koOyIiAiIgLw30j7k7QFdJPSxyzQzHHaOTCY3kAPbbEDqMQIuOd1L3JEHy7WUdfADj5dtsi2TEHtPacj7FWtrJyCcbnW1DmgEd5Fl6T/ANoGkeySnqG3Ac10biMs2nGBcG9yCbdhXkHy6cC3LSafXcR4EoJklW5xtiZ2FjQfGyxyuJyOR4Xa23cbLMyd7o3TYS2Nr2Rl7sJHKPY5wbitfPk3nqFrnMLitoXsjjmkYWxzYjG+7S1+A2dbCcrHLO2hQRnNIGbA7sDfgutLXCJ2JuNhIseII6CNCFy1jeDiOwrh0XEuNuk2t3oOzK2M8R+Vo9ywVcwJFjdYZS0cGHrB+BWWjpnzOwxQOlda9o2vebdNm3QYSssjrMt0n+/wWVlJKZhT/J3iW9jGWycoBbETg1Fm87TTPRY6qIA2ve36+CCZRN5pPd3an2Lk1ZIwvFwejUdi70LrNPUVkhqxjaY2lrxmHNcWlv8AEHNzCDj5HdsT2kuxNkxWF8PJWOLLhgcD1Wd0LAKg2wxiw6eJV/tHeKR0Ah5Rzm4zjcCRjEl3PDiDmMTux2G/AKlknc0CzW2OjgD8dUEXaI5jOkEhdtmRgxuuQLnDc8B6x9o8F2rfVb0m58VYbtbtVlW15pqYzBrgHEOY0NJFwOe4cEEH5LGNZB/m/wBKcjD9Yn8J+IW603ot2s76CGP78rL/AOTEtY29s+oopnU84DJG55DJzTo9jrDE09PUQbEWQQxHFwa8/hHxK7iNvCF57bD+lYoZXPH7wg9HT2G64ip5XvbG0Pc9zg1rRcucToGt1JQSsB+xA7X/AOy4Lj0QjtcT717Lu/6GqIQsNWZHzFoMgbKWsa454W4QCbZC987Xyur+n9F2x2f8oHfflmf5OfZB88unt9JGOxgPuWJ9cPt/ytAX0/T7lbLZ6tBTZcTCxx8XAq1ptnwR5Rwxs+6xrfYEHyOIA7ngTPHE4MQz67HVRKuGxthc3pa4EEacD2r7NxBfNfpr2QYdqSPtzKhrZWnhcAMeL9OJgP4wg06gNtdMld7v1kMcmMwsc0HMSNBJJBbha4Z/OuRe3NVBTmylB4BAtZoue/pQZZZwS6TkxdxztZoaTwDALAdCra/O/YpjdcQ0LecOk8bDtHmvdNj+h6gMMLqhspmwMMzRKQwvsC5uHovlkQg9IogeTZfXA2/bYLMuAuboCIiDi64usReujpUEi64xKE+qsok20wEGLfTd9m0KSSmcQ1x50b7XwSD1XdmoPUSvl/bOypaaV0E7DHKw5g6Hoc08WkaH+9vpKq3jDdGkrSt8dpR1jMEtJHJb1XOLmvb917LOHZex4oPGYa2RsckLXHk5Q3lGcCWHE1wHBwPEdJGhIUa7Q0NaCLG5PEnh+usq4rd25A4lhs3gCSSOq9hdQn7HmGp9qDtsXZM1ZO2CFmJ7jpwaOL3n5rBxPvX1DunseGgpY6WOxDRd7iBz5HZuee06dAAHBfP+w95KqiYWQRQxg+sQxxc631nuJJ1PUOCmv9IW0OLm9zUHv9RDTP8AXhid96Nh9oXWkFPD+6iijytzGNZl0c0BfPUm/dcdX+CiS74VZ1kd4lB9IyVUJcXFrcRGEusMWE6jFrZfK+8GzzBUzQ/ZyOaOtoPMI6i0MP4lLl3iqDrI7xKrauodIcTjc6X4kIMtA4XwnQ/q6mClsyXntaWi5xE3dc2DGWGZ8rKpxjUFWUMrJQGvOFw0da47D8UGNtua06Oa6/Ub3b7AulK13q2yPtHH9dClSUFjcvb+YW8LXWMv1bHmeLreQQcz0uKzhIwcACXA2GXBpC3LcDe+PZsEkbuc6STGcJyADWtAuRnoT3rSG0bzwK5ZseU/NKD1Sb0vD5rPErW95t/vlrOTlhhe0aY4y4tJ4tdiBaexazFu3M75h8CpsO5lQ76N3gg1mWmZe4e4dXQrLYW2pqIl1O5rXnIvMbXPseAc65A6hZbHD6Pqg/MKnwejWY62HegqP+8faX/iL/hb8FyPSLtHjMfBbNB6MHcXDzVjB6MWcXeSDSh6Qq/7RyyN9Idb9o5egwejeEa3KsIdwacfMug8zZ6R6wayOVXvPvS6uja2Z3OYSWOIzaTkRfoNhfsB4L26LcumH0Te8KSzdOmH0LPyhB8vNlHSPEKZBWx2s8A9YNj8Cvpxm7FMPoI/+m34KXDsWFvqxsHY0D2BB4LuXstzpmVBiJYxwexhBOJ4za51hoDnbiQO/wBooNtVLhzo7eIV42iHQsoph0IIcO0JDq1S46t3QsggC7iJAbOsglXURrsGIBYsboVKsuLIIL6W6wSbOB4K1smFBr0uxGngoU27DDwW24UwINDm3NaVBm3EBXpWBcYAg8ql9H11Ek9HJXsHJhOTCDxd/o0esDvRhIV7fyYTkwg8Ld6K5TxCxO9Ek50e0L3nkwnJhB8/S+hipdpNG3ud7l3h9ClTxrGDsicf6gvfuTCYEHh1P6FH3/aVhcOgRYfPGVtGzvRrDEALl1uoDyC9JwJgQafBufA36MKZHu7ENGN8AtlwJhQUjNjtHzR4LK3Zo6FbYUwoK1tCOhdxRjoU/CubIIQpQuwpwpeFLIIwgXIhUiyWQYeSXIjWWyWQY8C5wLJZEGPCucK7og6YVzZdkQdbLmy5RByiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIg//2Q=="
  },
  { 
    id: 4, 
    marca: "FORD", 
    modelo: "Ranger Limited V6", 
    anio: 2024, 
    precio: "u$s 48.200", 
    categoria: "Camionetas",
    img: "data:image/jpeg;base64,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"
  },
  { 
    id: 5, 
    marca: "KAWASAKI", 
    modelo: "Ninja 400 ABS", 
    anio: 2023, 
    precio: "u$s 12.500", 
    categoria: "Motos",
    img: "https://i0.wp.com/automundo.com.ar/wp-content/uploads/2021/08/Kawasaki-2.jpg?fit=1200%2C800&ssl=1"
  }
];

function App() {
  const [filtro, setFiltro] = useState('Todos');
  const filtrados = filtro === 'Todos' ? unidades : unidades.filter(u => u.categoria === filtro);

  const abrirWhatsApp = (modelo = "Consulta General") => {
    const mensaje = encodeURIComponent(`Hola Jorge, vi la unidad ${modelo} en tu web y me interesa recibir más info.`);
    window.open(`https://wa.me/5492610000000?text=${mensaje}`, '_blank'); // Poné el número real de Jorge acá
  };

  const scrollToStock = () => {
    document.getElementById('stock')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans antialiased">
      
      {/* NAVBAR */}
      <nav className="border-b border-gray-900 p-4 bg-black/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img src={logoJorge} alt="Logo Jorge Ortiz" className="h-10 md:h-14 object-contain" />
          
          <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <button onClick={scrollToStock} className="hover:text-[#009de1] transition-colors">Stock Actual</button>
            <button onClick={() => alert('Próximamente: Simulador de créditos prendarios')} className="hover:text-[#009de1] transition-colors">Financiación</button>
            <button onClick={() => abrirWhatsApp()} className="hover:text-[#009de1] transition-colors">Contacto</button>
          </div>

          <button onClick={() => abrirWhatsApp("Tasación de usado")} className="bg-[#009de1] text-white px-5 py-2 rounded font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 transition-all">
            Vender mi unidad
          </button>
        </div>
      </nav>

      {/* HEADER / TITULO */}
      <header className="py-20 px-6 text-center bg-gradient-to-b from-black to-[#0a0a0a]">
        <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase italic">
          STOCK <span className="text-[#009de1]">JORGE ORTIZ</span>
        </h2>
        <p className="text-gray-500 text-[10px] tracking-[0.4em] uppercase font-bold mb-10">
          Unidades Seleccionadas • Calidad & Confianza
        </p>
        
        {/* FILTROS */}
        <div className="flex justify-center gap-2">
          {['Todos', 'Camionetas', 'Motos'].map(cat => (
            <button 
              key={cat} 
              onClick={() => setFiltro(cat)}
              className={`px-8 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all border ${
                filtro === cat ? 'bg-[#009de1] border-[#009de1]' : 'border-gray-800 text-gray-600 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* GRILLA */}
      <main id="stock" className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 pb-24">
        {filtrados.map(u => (
          <div key={u.id} className="group bg-[#111] rounded-xl overflow-hidden border border-gray-900 hover:border-[#009de1]/50 transition-all duration-500 shadow-2xl">
            <div className="relative h-64 overflow-hidden">
              <img src={u.img} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" alt={u.modelo} />
              <div className="absolute top-4 right-4 bg-black/80 px-3 py-1 rounded text-[10px] font-black border border-gray-800">
                {u.anio}
              </div>
            </div>
            
            <div className="p-8">
              <span className="text-[#009de1] text-[10px] font-black uppercase tracking-widest">{u.marca}</span>
              <h3 className="text-2xl font-black mt-1 uppercase italic tracking-tighter">{u.modelo}</h3>
              
              <div className="mt-6 flex justify-between items-end border-b border-gray-800 pb-6 mb-6">
                <div>
                  <p className="text-gray-600 text-[9px] font-bold uppercase">Precio Contado</p>
                  <p className="text-3xl font-black text-white">{u.precio}</p>
                </div>
                <div className="text-right text-[9px] text-gray-600 font-bold uppercase italic">Mendoza</div>
              </div>

              <button 
                onClick={() => abrirWhatsApp(u.modelo)}
                className="w-full py-4 bg-white text-black font-black text-[11px] uppercase rounded hover:bg-[#009de1] hover:text-white transition-all shadow-xl"
              >
                Consultar Ahora
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-900 bg-black p-16 text-center">
        <div className="flex justify-center gap-12 opacity-20 grayscale mb-8 pointer-events-none flex-wrap">
          <span className="font-black text-xs">SANTANDER</span>
          <span className="font-black text-xs">BBVA</span>
          <span className="font-black text-xs">MERCADO PAGO</span>
        </div>
        <p className="text-[10px] text-gray-700 font-bold uppercase tracking-[0.5em]">
          JORGE ORTIZ AUTOMOTORES • 2026
        </p>
      </footer>
    </div>
  );
}

export default App;
