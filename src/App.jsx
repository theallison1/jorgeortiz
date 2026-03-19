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
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800"
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
