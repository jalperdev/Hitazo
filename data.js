// Listas de canciones de la app. Formato de cada línea: Artista|Título|Año
// El año es el de la primera publicación (single o álbum, lo que saliera antes).
// Puedes añadir, quitar o corregir líneas: la app busca cada canción en Spotify al reproducirla.

const TODOS = `
Bill Haley & His Comets|Rock Around the Clock|1954
Elvis Presley|Heartbreak Hotel|1956
Elvis Presley|Hound Dog|1956
Elvis Presley|Jailhouse Rock|1957
Elvis Presley|Can't Help Falling in Love|1961
Elvis Presley|Suspicious Minds|1969
Chuck Berry|Johnny B. Goode|1958
Little Richard|Tutti Frutti|1955
Ray Charles|What'd I Say|1959
Ray Charles|Hit the Road Jack|1961
Jerry Lee Lewis|Great Balls of Fire|1957
Buddy Holly|Peggy Sue|1957
Ritchie Valens|La Bamba|1958
Paul Anka|Diana|1957
The Everly Brothers|Bye Bye Love|1957
Domenico Modugno|Nel blu dipinto di blu|1958
Dean Martin|That's Amore|1953
Fats Domino|Blueberry Hill|1956
Bobby Darin|Beyond the Sea|1959
The Platters|Only You (And You Alone)|1955
Nat King Cole|Unforgettable|1951
Chubby Checker|The Twist|1960
Ben E. King|Stand by Me|1961
Frank Sinatra|Fly Me to the Moon|1964
The Beatles|Love Me Do|1962
The Beatles|She Loves You|1963
The Beatles|I Want to Hold Your Hand|1963
The Beatles|Help!|1965
The Beatles|Yesterday|1965
The Beatles|Hey Jude|1968
The Beatles|Come Together|1969
The Beatles|Here Comes the Sun|1969
The Beatles|Let It Be|1970
The Rolling Stones|(I Can't Get No) Satisfaction|1965
The Rolling Stones|Paint It Black|1966
The Beach Boys|Surfin' U.S.A.|1963
The Beach Boys|Good Vibrations|1966
The Kinks|You Really Got Me|1964
The Animals|The House of the Rising Sun|1964
The Temptations|My Girl|1964
The Supremes|Baby Love|1964
The Righteous Brothers|You've Lost That Lovin' Feelin'|1964
Bob Dylan|Like a Rolling Stone|1965
Simon & Garfunkel|The Sound of Silence|1965
Simon & Garfunkel|Mrs. Robinson|1968
Simon & Garfunkel|Bridge Over Troubled Water|1970
Tom Jones|It's Not Unusual|1965
The Mamas & The Papas|California Dreamin'|1965
Nancy Sinatra|These Boots Are Made for Walkin'|1966
The Monkees|I'm a Believer|1966
The Troggs|Wild Thing|1966
Los Bravos|Black Is Black|1966
Raphael|Yo soy aquel|1966
The Doors|Light My Fire|1967
Aretha Franklin|Respect|1967
Louis Armstrong|What a Wonderful World|1967
The Jimi Hendrix Experience|Purple Haze|1967
Procol Harum|A Whiter Shade of Pale|1967
The Turtles|Happy Together|1967
Otis Redding|(Sittin' On) The Dock of the Bay|1968
Marvin Gaye|I Heard It Through the Grapevine|1968
Dusty Springfield|Son of a Preacher Man|1968
Massiel|La, la, la|1968
Creedence Clearwater Revival|Proud Mary|1969
Creedence Clearwater Revival|Bad Moon Rising|1969
Led Zeppelin|Whole Lotta Love|1969
The Archies|Sugar, Sugar|1969
David Bowie|Space Oddity|1969
The Jackson 5|I Want You Back|1969
The Jackson 5|ABC|1970
Serge Gainsbourg|Je t'aime... moi non plus|1969
George Harrison|My Sweet Lord|1970
Elton John|Your Song|1970
Los Diablos|Un rayo de sol|1970
Peret|Borriquito|1971
John Lennon|Imagine|1971
Led Zeppelin|Stairway to Heaven|1971
Don McLean|American Pie|1971
Marvin Gaye|What's Going On|1971
Bill Withers|Ain't No Sunshine|1971
Deep Purple|Smoke on the Water|1972
Stevie Wonder|Superstition|1972
Elton John|Rocket Man|1972
Elton John|Crocodile Rock|1972
Lou Reed|Walk on the Wild Side|1972
Nino Bravo|Libre|1972
Mocedades|Eres tú|1973
Fórmula V|Eva María|1973
ABBA|Waterloo|1974
Jeanette|Porque te vas|1974
Lynyrd Skynyrd|Sweet Home Alabama|1974
Carl Douglas|Kung Fu Fighting|1974
Barry White|You're the First, the Last, My Everything|1974
Queen|Bohemian Rhapsody|1975
ABBA|Mamma Mia|1975
Pink Floyd|Wish You Were Here|1975
Bob Marley & The Wailers|No Woman, No Cry|1975
KC & The Sunshine Band|That's the Way (I Like It)|1975
ABBA|Dancing Queen|1976
Eagles|Hotel California|1976
Ramones|Blitzkrieg Bop|1976
Boney M.|Daddy Cool|1976
Queen|We Will Rock You|1977
Fleetwood Mac|Dreams|1977
Bee Gees|Stayin' Alive|1977
Bee Gees|How Deep Is Your Love|1977
Donna Summer|I Feel Love|1977
David Bowie|Heroes|1977
Stevie Wonder|Sir Duke|1977
Electric Light Orchestra|Mr. Blue Sky|1977
Sex Pistols|God Save the Queen|1977
Baccara|Yes Sir, I Can Boogie|1977
Umberto Tozzi|Ti amo|1977
Gloria Gaynor|I Will Survive|1978
Village People|Y.M.C.A.|1978
Boney M.|Rasputin|1978
Chic|Le Freak|1978
Earth, Wind & Fire|September|1978
Rod Stewart|Da Ya Think I'm Sexy?|1978
Dire Straits|Sultans of Swing|1978
Camilo Sesto|Vivir así es morir de amor|1978
Julio Iglesias|Soy un truhán, soy un señor|1978
Queen|Don't Stop Me Now|1979
ABBA|Gimme! Gimme! Gimme! (A Man After Midnight)|1979
AC/DC|Highway to Hell|1979
Pink Floyd|Another Brick in the Wall, Pt. 2|1979
The Clash|London Calling|1979
Blondie|Heart of Glass|1979
Supertramp|The Logical Song|1979
Michael Jackson|Don't Stop 'Til You Get Enough|1979
The Knack|My Sharona|1979
KISS|I Was Made for Lovin' You|1979
The Police|Message in a Bottle|1979
The Cure|Boys Don't Cry|1979
Kool & The Gang|Celebration|1980
Queen|Another One Bites the Dust|1980
AC/DC|Back in Black|1980
Blondie|Call Me|1980
Bob Marley & The Wailers|Could You Be Loved|1980
Nacha Pop|La chica de ayer|1980
Journey|Don't Stop Believin'|1981
Phil Collins|In the Air Tonight|1981
Depeche Mode|Just Can't Get Enough|1981
Los Secretos|Déjame|1981
Michael Jackson|Billie Jean|1982
Michael Jackson|Beat It|1982
Survivor|Eye of the Tiger|1982
Toto|Africa|1982
Mecano|Me colé en una fiesta|1982
Miguel Ríos|Bienvenidos|1982
The Police|Every Breath You Take|1983
Cyndi Lauper|Girls Just Want to Have Fun|1983
Eurythmics|Sweet Dreams (Are Made of This)|1983
Bonnie Tyler|Total Eclipse of the Heart|1983
Lionel Richie|All Night Long (All Night)|1983
Irene Cara|Flashdance... What a Feeling|1983
U2|Sunday Bloody Sunday|1983
UB40|Red Red Wine|1983
Loquillo|Cadillac solitario|1983
Madonna|Like a Virgin|1984
Prince|Purple Rain|1984
Wham!|Wake Me Up Before You Go-Go|1984
Wham!|Last Christmas|1984
George Michael|Careless Whisper|1984
Bruce Springsteen|Born in the U.S.A.|1984
Bruce Springsteen|Dancing in the Dark|1984
Lionel Richie|Hello|1984
Queen|Radio Ga Ga|1984
Queen|I Want to Break Free|1984
Van Halen|Jump|1984
Ray Parker Jr.|Ghostbusters|1984
Kenny Loggins|Footloose|1984
Bryan Adams|Summer of '69|1984
Modern Talking|You're My Heart, You're My Soul|1984
Radio Futura|Escuela de calor|1984
a-ha|Take On Me|1985
Dire Straits|Money for Nothing|1985
Tears for Fears|Everybody Wants to Rule the World|1985
Simple Minds|Don't You (Forget About Me)|1985
USA for Africa|We Are the World|1985
Falco|Rock Me Amadeus|1985
Pet Shop Boys|West End Girls|1985
Kate Bush|Running Up That Hill (A Deal with God)|1985
Hombres G|Devuélveme a mi chica|1985
Hombres G|Venecia|1985
Europe|The Final Countdown|1986
Bon Jovi|Livin' on a Prayer|1986
Prince|Kiss|1986
Madonna|La Isla Bonita|1986
Run-DMC|Walk This Way|1986
The Bangles|Walk Like an Egyptian|1986
Berlin|Take My Breath Away|1986
Mecano|Hijo de la Luna|1986
Mecano|Me cuesta tanto olvidarte|1986
Alaska y Dinarama|A quién le importa|1986
Whitney Houston|I Wanna Dance with Somebody (Who Loves Me)|1987
U2|With or Without You|1987
Rick Astley|Never Gonna Give You Up|1987
Guns N' Roses|Sweet Child O' Mine|1987
Guns N' Roses|Welcome to the Jungle|1987
Kylie Minogue|I Should Be So Lucky|1987
Gipsy Kings|Bamboleo|1987
Duncan Dhu|En algún lugar|1987
Gabinete Caligari|Camino Soria|1987
Bobby McFerrin|Don't Worry, Be Happy|1988
Mecano|La fuerza del destino|1988
Madonna|Like a Prayer|1989
Kaoma|Lambada|1989
Technotronic|Pump Up the Jam|1989
Depeche Mode|Enjoy the Silence|1990
MC Hammer|U Can't Touch This|1990
Vanilla Ice|Ice Ice Baby|1990
Roxette|It Must Have Been Love|1990
Héroes del Silencio|Entre dos tierras|1990
Nirvana|Smells Like Teen Spirit|1991
Nirvana|Come as You Are|1991
R.E.M.|Losing My Religion|1991
Queen|The Show Must Go On|1991
Guns N' Roses|November Rain|1991
Metallica|Enter Sandman|1991
Metallica|Nothing Else Matters|1991
Red Hot Chili Peppers|Under the Bridge|1991
Bryan Adams|(Everything I Do) I Do It for You|1991
Celtas Cortos|20 de abril|1991
Mecano|Una rosa es una rosa|1991
Snap!|Rhythm Is a Dancer|1992
Dr. Alban|It's My Life|1992
Ace of Base|All That She Wants|1992
Radiohead|Creep|1992
Whitney Houston|I Will Always Love You|1992
The Cure|Friday I'm in Love|1992
Haddaway|What Is Love|1993
2 Unlimited|No Limit|1993
Ace of Base|The Sign|1993
Culture Beat|Mr. Vain|1993
Corona|The Rhythm of the Night|1993
The Cranberries|Linger|1993
Los del Río|Macarena|1993
Los Rodríguez|Sin documentos|1993
Marta Sánchez|Desesperada|1993
The Cranberries|Zombie|1994
Green Day|Basket Case|1994
Mariah Carey|All I Want for Christmas Is You|1994
Whigfield|Saturday Night|1994
Coolio|Gangsta's Paradise|1995
Oasis|Wonderwall|1995
Alanis Morissette|Ironic|1995
2Pac|California Love|1995
No Doubt|Don't Speak|1995
Shakira|Estoy aquí|1995
Enrique Iglesias|Experiencia religiosa|1995
Oasis|Don't Look Back in Anger|1996
Spice Girls|Wannabe|1996
Fugees|Killing Me Softly with His Song|1996
Gala|Freed from Desire|1996
Ella Baila Sola|Lo echamos a suertes|1996
Jarabe de Palo|La flaca|1996
Rosana|El talismán|1996
Extremoduro|So payaso|1996
Blur|Song 2|1997
Backstreet Boys|Everybody (Backstreet's Back)|1997
Celine Dion|My Heart Will Go On|1997
Aqua|Barbie Girl|1997
Will Smith|Men in Black|1997
Hanson|MMMBop|1997
Chumbawamba|Tubthumping|1997
The Verve|Bitter Sweet Symphony|1997
Natalie Imbruglia|Torn|1997
Robbie Williams|Angels|1997
Shania Twain|Man! I Feel Like a Woman!|1997
Alejandro Sanz|Corazón partío|1997
Alejandro Sanz|Amiga mía|1997
Britney Spears|...Baby One More Time|1998
Eiffel 65|Blue (Da Ba Dee)|1998
The Offspring|Pretty Fly (For a White Guy)|1998
Cher|Believe|1998
Madonna|Frozen|1998
Ricky Martin|La copa de la vida|1998
La Oreja de Van Gogh|Cuéntame al oído|1998
Backstreet Boys|I Want It That Way|1999
Lou Bega|Mambo No. 5 (A Little Bit of...)|1999
Ricky Martin|Livin' la Vida Loca|1999
Enrique Iglesias|Bailamos|1999
TLC|No Scrubs|1999
Red Hot Chili Peppers|Californication|1999
Estopa|Como Camarón|1999
Estopa|La raja de tu falda|1999
Eminem|The Real Slim Shady|2000
Coldplay|Yellow|2000
Linkin Park|In the End|2000
Bon Jovi|It's My Life|2000
Daft Punk|One More Time|2000
Shaggy|It Wasn't Me|2000
Modjo|Lady (Hear Me Tonight)|2000
Kylie Minogue|Can't Get You Out of My Head|2001
Shakira|Whenever, Wherever|2001
Eminem|Lose Yourself|2002
Eminem|Without Me|2002
Coldplay|Clocks|2002
Avril Lavigne|Complicated|2002
Avril Lavigne|Sk8er Boi|2002
Robbie Williams|Feel|2002
Las Ketchup|Aserejé|2002
Amaral|Sin ti no soy nada|2002
David Bisbal|Ave María|2002
OutKast|Hey Ya!|2003
Beyoncé|Crazy in Love|2003
Black Eyed Peas|Where Is the Love?|2003
The Killers|Mr. Brightside|2003
The White Stripes|Seven Nation Army|2003
Linkin Park|Numb|2003
Evanescence|Bring Me to Life|2003
Britney Spears|Toxic|2003
50 Cent|In da Club|2003
La Oreja de Van Gogh|Rosas|2003
Fito y Fitipaldis|Soldadito marinero|2003
Andy & Lucas|Son de amores|2003
Franz Ferdinand|Take Me Out|2004
Usher|Yeah!|2004
James Blunt|You're Beautiful|2004
Juanes|La camisa negra|2004
Daddy Yankee|Gasolina|2004
Gorillaz|Feel Good Inc.|2005
Bob Sinclar|Love Generation|2005
El Canto del Loco|Zapatillas|2005
Melendi|Caminando por la vida|2005
Shakira|Hips Don't Lie|2006
Nelly Furtado|Promiscuous|2006
Nelly Furtado|Maneater|2006
Amy Winehouse|Rehab|2006
Amy Winehouse|Back to Black|2006
Gnarls Barkley|Crazy|2006
Justin Timberlake|SexyBack|2006
Mika|Relax, Take It Easy|2006
Rihanna|Umbrella|2007
Leona Lewis|Bleeding Love|2007
Flo Rida|Low|2007
MGMT|Kids|2007
Beyoncé|Single Ladies (Put a Ring on It)|2008
Coldplay|Viva la Vida|2008
Lady Gaga|Just Dance|2008
Lady Gaga|Poker Face|2008
Katy Perry|I Kissed a Girl|2008
Kings of Leon|Sex on Fire|2008
Duffy|Mercy|2008
Vetusta Morla|Copenhague|2008
Black Eyed Peas|I Gotta Feeling|2009
Lady Gaga|Bad Romance|2009
David Guetta|When Love Takes Over|2009
Pitbull|I Know You Want Me (Calle Ocho)|2009
Shakira|Waka Waka (This Time for Africa)|2010
Bruno Mars|Just the Way You Are|2010
Adele|Rolling in the Deep|2010
Adele|Someone Like You|2011
Gotye|Somebody That I Used to Know|2011
Carly Rae Jepsen|Call Me Maybe|2011
LMFAO|Party Rock Anthem|2011
Avicii|Levels|2011
David Guetta|Titanium|2011
Rihanna|We Found Love|2011
Maroon 5|Moves like Jagger|2011
Pablo Alborán|Solamente tú|2011
PSY|Gangnam Style|2012
Rihanna|Diamonds|2012
Imagine Dragons|Radioactive|2012
Bruno Mars|Locked Out of Heaven|2012
Passenger|Let Her Go|2012
Avicii|Wake Me Up|2013
Pharrell Williams|Happy|2013
Daft Punk|Get Lucky|2013
Lorde|Royals|2013
OneRepublic|Counting Stars|2013
Hozier|Take Me to Church|2013
Miley Cyrus|Wrecking Ball|2013
Mark Ronson|Uptown Funk|2014
Ed Sheeran|Thinking Out Loud|2014
Taylor Swift|Shake It Off|2014
Taylor Swift|Blank Space|2014
Sia|Chandelier|2014
Calvin Harris|Summer|2014
Clean Bandit|Rather Be|2014
Coldplay|A Sky Full of Stars|2014
Adele|Hello|2015
Justin Bieber|Sorry|2015
Justin Bieber|Love Yourself|2015
The Weeknd|Can't Feel My Face|2015
Maroon 5|Sugar|2015
Sia|Cheap Thrills|2016
Bruno Mars|24K Magic|2016
Ed Sheeran|Shape of You|2017
Ed Sheeran|Perfect|2017
Imagine Dragons|Believer|2017
Luis Fonsi|Despacito|2017
Dua Lipa|New Rules|2017
Camila Cabello|Havana|2017
Måneskin|Beggin'|2017
Lewis Capaldi|Someone You Loved|2018
Lil Nas X|Old Town Road|2018
Rosalía|Malamente|2018
The Weeknd|Blinding Lights|2019
Dua Lipa|Don't Start Now|2019
Billie Eilish|bad guy|2019
Shawn Mendes|Señorita|2019
Tones And I|Dance Monkey|2019
Harry Styles|Watermelon Sugar|2019
Rosalía|Con altura|2019
Taylor Swift|Cruel Summer|2019
Dua Lipa|Levitating|2020
Glass Animals|Heat Waves|2020
C. Tangana|Tú me dejaste de querer|2020
Olivia Rodrigo|drivers license|2021
Harry Styles|As It Was|2022
Taylor Swift|Anti-Hero|2022
Rosalía|Despechá|2022
Bizarrap|Quevedo: Bzrp Music Sessions, Vol. 52|2022
Miley Cyrus|Flowers|2023
Bizarrap|Shakira: Bzrp Music Sessions, Vol. 53|2023
Teddy Swims|Lose Control|2023
Sabrina Carpenter|Espresso|2024
Billie Eilish|BIRDS OF A FEATHER|2024
Chappell Roan|Good Luck, Babe!|2024
Lady Gaga|Die With A Smile|2024
Benson Boone|Beautiful Things|2024
ROSÉ|APT.|2024
Alex Warren|Ordinary|2025
Lady Gaga|Abracadabra|2025
HUNTR/X|Golden|2025
Bad Bunny|DtMF|2025
`;

const LOS40 = `
Los Bravos|Black Is Black|1966
Raphael|Yo soy aquel|1966
Massiel|La, la, la|1968
Los Diablos|Un rayo de sol|1970
Nino Bravo|Un beso y una flor|1972
Nino Bravo|Libre|1972
Camilo Sesto|Algo de mí|1972
Mocedades|Eres tú|1973
Fórmula V|Eva María|1973
Jeanette|Porque te vas|1974
ABBA|Waterloo|1974
Miguel Bosé|Linda|1977
Baccara|Yes Sir, I Can Boogie|1977
Umberto Tozzi|Ti amo|1977
Boney M.|Rivers of Babylon|1978
Camilo Sesto|Vivir así es morir de amor|1978
Julio Iglesias|Soy un truhán, soy un señor|1978
Julio Iglesias|Me olvidé de vivir|1978
ABBA|Chiquitita|1979
Raffaella Carrà|Hay que venir al sur|1979
Nacha Pop|La chica de ayer|1980
Los Secretos|Déjame|1981
Mecano|Me colé en una fiesta|1982
Mecano|Barco a Venus|1982
Michael Jackson|Billie Jean|1982
Tino Casal|Embrujada|1983
Miguel Bosé|Amante bandido|1984
Alaska y Dinarama|¿Cómo pudiste hacerme esto a mí?|1984
La Unión|Lobo hombre en París|1984
Radio Futura|Escuela de calor|1984
Hombres G|Devuélveme a mi chica|1985
Mecano|Hijo de la Luna|1986
Mecano|Cruz de navajas|1986
Duncan Dhu|Cien gaviotas|1986
Ana Belén|La puerta de Alcalá|1986
Modern Talking|Brother Louie|1986
Europe|The Final Countdown|1986
Madonna|La Isla Bonita|1986
Héroes del Silencio|Entre dos tierras|1990
Sergio Dalma|Bailar pegados|1991
Luz Casal|Piensa en mí|1991
Mecano|El 7 de septiembre|1991
Los del Río|Macarena|1993
Alejandro Sanz|Si tú me miras|1993
Marta Sánchez|Desesperada|1993
Ricky Martin|María|1995
Enrique Iglesias|Experiencia religiosa|1995
Ella Baila Sola|Lo echamos a suertes|1996
Ella Baila Sola|Cuando los sapos bailen flamenco|1996
Jarabe de Palo|La flaca|1996
Rosana|Lunas rotas|1996
Spice Girls|Wannabe|1996
Alejandro Sanz|Corazón partío|1997
Alejandro Sanz|Y, ¿si fuera ella?|1997
Alejandro Sanz|Amiga mía|1997
Mónica Naranjo|Sobreviviré|1997
Ricky Martin|La copa de la vida|1998
Shakira|Ciega, sordomuda|1998
Shakira|Ojos así|1998
Enrique Iglesias|Nunca te olvidaré|1998
Jarabe de Palo|Depende|1998
La Oreja de Van Gogh|Cuéntame al oído|1998
Britney Spears|...Baby One More Time|1998
Estopa|Como Camarón|1999
Café Quijano|La Lola|1999
Joaquín Sabina|19 días y 500 noches|1999
Backstreet Boys|I Want It That Way|1999
Paulina Rubio|Y yo sigo aquí|2000
Shakira|Whenever, Wherever|2001
Las Ketchup|Aserejé|2002
David Bisbal|Ave María|2002
Chenoa|Cuando tú vas|2002
Amaral|Sin ti no soy nada|2002
Amaral|Cómo hablar|2002
Juanes|A Dios le pido|2002
La Oreja de Van Gogh|Puedes contar conmigo|2003
La Oreja de Van Gogh|Rosas|2003
Melendi|Con la luna llena|2003
David Bisbal|Bulería|2004
Juanes|La camisa negra|2004
Estopa|Vino tinto|2004
James Blunt|You're Beautiful|2004
El Canto del Loco|Zapatillas|2005
El Canto del Loco|Peter Pan|2005
Shakira|La Tortura|2005
Shakira|Hips Don't Lie|2006
Nelly Furtado|Say It Right|2006
Mika|Relax, Take It Easy|2006
Fangoria|Retorciendo palabras|2006
Nena Daconte|En qué estrella estará|2006
Alejandro Sanz|Te lo agradezco, pero no|2006
Rihanna|Umbrella|2007
Leona Lewis|Bleeding Love|2007
Juanes|Me enamora|2007
Lady Gaga|Poker Face|2008
Black Eyed Peas|I Gotta Feeling|2009
Paulina Rubio|Ni rosas ni juguetes|2009
Enrique Iglesias|I Like It|2010
Dani Martín|Mi lamento|2010
Malú|Blanco y negro|2010
Pablo Alborán|Solamente tú|2011
Melendi|Tu jardín con enanitos|2012
Enrique Iglesias|Bailando|2014
Pablo Alborán|Te he echado de menos|2014
Álvaro Soler|El mismo sol|2015
Gente de Zona|La Gozadera|2015
Álvaro Soler|Sofia|2016
Carlos Vives|La Bicicleta|2016
Enrique Iglesias|DUELE EL CORAZON|2016
Sebastián Yatra|Traicionera|2016
Luis Fonsi|Despacito|2017
Maluma|Felices los 4|2017
J Balvin|Mi Gente|2017
Pablo Alborán|Saturno|2017
Ed Sheeran|Shape of You|2017
Aitana|Teléfono|2018
Aitana|Lo malo|2018
Ana Guerra|Ni la hora|2018
Morat|Besos en guerra|2018
Rosalía|Malamente|2018
Alejandro Sanz|Mi persona favorita|2019
Dua Lipa|Don't Start Now|2019
The Weeknd|Blinding Lights|2019
C. Tangana|Tú me dejaste de querer|2020
Camilo|Vida de Rico|2020
Sebastián Yatra|Tacones Rojos|2021
Manuel Turizo|La Bachata|2022
Rosalía|Despechá|2022
Chanel|SloMo|2022
Shakira|Te Felicito|2022
Harry Styles|As It Was|2022
Bizarrap|Quevedo: Bzrp Music Sessions, Vol. 52|2022
Bizarrap|Shakira: Bzrp Music Sessions, Vol. 53|2023
Karol G|TQG|2023
Myke Towers|LALA|2023
Vicco|Nochentera|2023
Blanca Paloma|Eaea|2023
Miley Cyrus|Flowers|2023
Karol G|Si Antes Te Hubiera Conocido|2024
Shakira|Soltera|2024
Sabrina Carpenter|Espresso|2024
Lady Gaga|Die With A Smile|2024
ROSÉ|APT.|2024
Melody|Esa diva|2025
Bad Bunny|DtMF|2025
`;

const VERANO = `
The Beach Boys|Surfin' U.S.A.|1963
The Lovin' Spoonful|Summer in the City|1966
Mungo Jerry|In the Summertime|1970
Los Diablos|Un rayo de sol|1970
Peret|Borriquito|1971
Fórmula V|Eva María|1973
Bimbo Jet|El Bimbo|1974
Georgie Dann|El bimbó|1975
Black Blood|A.I.E. (A Mwana)|1975
Raffaella Carrà|Fiesta|1977
Bob Marley & The Wailers|Could You Be Loved|1980
Mecano|Me colé en una fiesta|1982
Wham!|Club Tropicana|1983
UB40|Red Red Wine|1983
Bananarama|Cruel Summer|1984
Bryan Adams|Summer of '69|1984
Gipsy Kings|Bamboleo|1987
Gipsy Kings|Djobi Djoba|1987
Georgie Dann|El chiringuito|1988
Kaoma|Lambada|1989
Gipsy Kings|Volare|1989
DJ Jazzy Jeff & The Fresh Prince|Summertime|1991
Chimo Bayo|Así me gusta a mí|1991
Inner Circle|Sweat (A La La La La Long)|1992
Dr. Alban|Sing Hallelujah!|1992
Corona|The Rhythm of the Night|1993
Los del Río|Macarena|1993
Whigfield|Saturday Night|1994
Shaggy|Boombastic|1995
Gala|Freed from Desire|1996
Ella Baila Sola|Lo echamos a suertes|1996
Ricky Martin|La copa de la vida|1998
Eiffel 65|Blue (Da Ba Dee)|1998
Vengaboys|Boom, Boom, Boom, Boom!!|1998
Vengaboys|We're Going to Ibiza!|1999
Lou Bega|Mambo No. 5 (A Little Bit of...)|1999
Ricky Martin|Livin' la Vida Loca|1999
Café Quijano|La Lola|1999
Estopa|Tu calorro|1999
Modjo|Lady (Hear Me Tonight)|2000
Las Ketchup|Aserejé|2002
Sean Paul|Get Busy|2002
O-Zone|Dragostea Din Tei|2003
Andy & Lucas|Son de amores|2003
Daddy Yankee|Gasolina|2004
Juanes|La camisa negra|2004
Bob Sinclar|Love Generation|2005
Wisin & Yandel|Rakata|2005
Sean Paul|Temperature|2005
Melendi|Caminando por la vida|2005
Bob Sinclar|Rock This Party (Everybody Dance Now)|2006
Shakira|Hips Don't Lie|2006
Nelly Furtado|Promiscuous|2006
Rihanna|Umbrella|2007
INNA|Hot|2008
Pitbull|I Know You Want Me (Calle Ocho)|2009
Edward Maya|Stereo Love|2009
Shakira|Waka Waka (This Time for Africa)|2010
Shakira|Loca|2010
Don Omar|Danza Kuduro|2010
Alexandra Stan|Mr. Saxobeat|2010
Pitbull|Give Me Everything|2011
Michel Teló|Ai Se Eu Te Pego|2011
Gusttavo Lima|Balada|2011
LMFAO|Party Rock Anthem|2011
Carly Rae Jepsen|Call Me Maybe|2011
PSY|Gangnam Style|2012
Avicii|Wake Me Up|2013
Pharrell Williams|Happy|2013
Daft Punk|Get Lucky|2013
MAGIC!|Rude|2013
Enrique Iglesias|Bailando|2014
Calvin Harris|Summer|2014
Kygo|Firestone|2014
OMI|Cheerleader|2014
Major Lazer|Lean On|2015
Gente de Zona|La Gozadera|2015
Álvaro Soler|El mismo sol|2015
Álvaro Soler|Sofia|2016
Carlos Vives|La Bicicleta|2016
Enrique Iglesias|DUELE EL CORAZON|2016
Luis Fonsi|Despacito|2017
J Balvin|Mi Gente|2017
Camila Cabello|Havana|2017
Måneskin|Beggin'|2017
Aitana|Lo malo|2018
Daddy Yankee|Con Calma|2019
Shawn Mendes|Señorita|2019
Rosalía|Con altura|2019
Bad Bunny|Callaita|2019
Tones And I|Dance Monkey|2019
Harry Styles|Watermelon Sugar|2019
Taylor Swift|Cruel Summer|2019
Dua Lipa|Levitating|2020
Sebastián Yatra|Tacones Rojos|2021
Rauw Alejandro|Todo de Ti|2021
Manuel Turizo|La Bachata|2022
Bad Bunny|Tití Me Preguntó|2022
Bad Bunny|Me Porto Bonito|2022
Rosalía|Despechá|2022
Karol G|PROVENZA|2022
Quevedo|Columbia|2023
Karol G|TQG|2023
Karol G|Si Antes Te Hubiera Conocido|2024
Sabrina Carpenter|Espresso|2024
Bad Bunny|BAILE INoLVIDABLE|2025
Alex Warren|Ordinary|2025
Gloria Estefan|Conga|1985
Juan Luis Guerra|La Bilirrubina|1990
Juan Luis Guerra|Burbujas de amor|1990
Azúcar Moreno|Solo se vive una vez|1990
Celia Cruz|La Vida Es un Carnaval|1998
Chayanne|Torero|2002
Cascada|Everytime We Touch|2005
Bob Sinclar|World, Hold On (Children of the Sky)|2006
Shakira|Loba|2009
Black Eyed Peas|I Gotta Feeling|2009
Yolanda Be Cool|We No Speak Americano|2010
Taio Cruz|Dynamite|2010
Jennifer Lopez|On the Floor|2011
Pitbull|Rain Over Me|2011
Marc Anthony|Vivir Mi Vida|2013
Pitbull|Timber|2013
Lost Frequencies|Are You with Me|2014
Robin Schulz|Prayer in C|2014
Mr. Probz|Waves - Robin Schulz Remix|2014
Nicky Jam|El Perdón|2015
J Balvin|Ginza|2015
Ricky Martin|La Mordidita|2015
Ricky Martin|Vente Pa' Ca|2016
Shakira|Chantaje|2016
Calvin Harris|This Is What You Came For|2016
Clean Bandit|Rockabye|2016
Kungs|This Girl|2016
Enrique Iglesias|SUBEME LA RADIO|2017
Becky G|Mayores|2017
Wisin|Escápate Conmigo|2017
Luis Fonsi|Échame La Culpa|2017
Calvin Harris|One Kiss|2018
DJ Snake|Taki Taki|2018
Camilo|Tutu|2019
Ana Mena|A Un Paso De La Luna|2020
Ana Mena|Música Ligera|2021
Sebastián Yatra|Pareja Del Año|2021
Bad Bunny|Moscow Mule|2022
Bizarrap|Quevedo: Bzrp Music Sessions, Vol. 52|2022
Myke Towers|LALA|2023
Bad Bunny|EoO|2025
`;

const REGGAETON = `
Tego Calderón|Pa' Que Retozen|2002
Don Omar|Dile|2003
Don Omar|Pobre Diabla|2003
Ivy Queen|Quiero Bailar|2003
Daddy Yankee|Gasolina|2004
Daddy Yankee|Lo Que Pasó, Pasó|2004
Zion & Lennox|Yo Voy|2004
Daddy Yankee|Rompe|2005
Wisin & Yandel|Rakata|2005
Calle 13|Atrévete-Te-Te|2005
Daddy Yankee|Ella Me Levantó|2007
Daddy Yankee|Llamado de Emergencia|2008
Don Omar|Salió El Sol|2009
Don Omar|Virtual Diva|2009
Wisin & Yandel|Abusadora|2009
Tito El Bambino|El Amor|2009
Don Omar|Danza Kuduro|2010
Daddy Yankee|Limbo|2012
Wisin & Yandel|Algo Me Gusta De Ti|2012
Nicky Jam|Travesuras|2014
J Balvin|Ay Vamos|2014
Nicky Jam|El Perdón|2015
J Balvin|Ginza|2015
Maluma|Borró Cassette|2015
Yandel|Encantadora|2015
Nicky Jam|Hasta el Amanecer|2016
Daddy Yankee|Shaky Shaky|2016
Zion & Lennox|Otra Vez|2016
J Balvin|Safari|2016
Ozuna|Dile Que Tu Me Quieres|2016
Bad Bunny|Soy Peor|2016
CNCO|Reggaetón Lento (Bailemos)|2016
Shakira|Chantaje|2016
Manuel Turizo|Una Lady Como Tú|2016
Luis Fonsi|Despacito|2017
J Balvin|Mi Gente|2017
Maluma|Felices los 4|2017
Maluma|Corazón|2017
Ozuna|Se Preparó|2017
Natti Natasha|Criminal|2017
Wisin|Escápate Conmigo|2017
Enrique Iglesias|SUBEME LA RADIO|2017
Nicky Jam|X|2018
Daddy Yankee|Dura|2018
J Balvin|Machika|2018
Nio Garcia|Te Boté - Remix|2018
DJ Snake|Taki Taki|2018
Cardi B|I Like It|2018
Becky G|Sin Pijama|2018
Daddy Yankee|Con Calma|2019
Bad Bunny|Callaita|2019
Anuel AA|China|2019
Anuel AA|Secreto|2019
Karol G|Tusa|2019
Sech|Otro Trago|2019
Lunay|Soltera|2019
Ozuna|Baila Baila Baila|2019
Rosalía|Con altura|2019
Bad Bunny|Dákiti|2020
Bad Bunny|Yo Perreo Sola|2020
Bad Bunny|Safaera|2020
J Balvin|Rojo|2020
J Balvin|Morado|2020
Maluma|Hawái|2020
Karol G|BICHOTA|2020
Myke Towers|Bandido|2020
Camilo|Vida de Rico|2020
Rauw Alejandro|Todo de Ti|2021
Rauw Alejandro|Desesperados|2021
Farruko|Pepas|2021
Nio Garcia|AM Remix|2021
Bad Bunny|Tití Me Preguntó|2022
Bad Bunny|Me Porto Bonito|2022
Karol G|PROVENZA|2022
Becky G|MAMIII|2022
Feid|Normal|2022
Rosalía|SAOKO|2022
Quevedo|Playa Del Inglés|2022
Bizarrap|Quevedo: Bzrp Music Sessions, Vol. 52|2022
Bad Bunny|Monaco|2023
Karol G|TQG|2023
Myke Towers|LALA|2023
Feid|Classy 101|2023
Quevedo|Columbia|2023
Karol G|Si Antes Te Hubiera Conocido|2024
Bad Bunny|DtMF|2025
Bad Bunny|BAILE INoLVIDABLE|2025
Bad Bunny|VOY A LLeVARTE PA PR|2025
Luny Tunes|Mayor Que Yo|2005
Wisin & Yandel|Pam Pam|2005
Wisin & Yandel|Sexy Movimiento|2007
Daddy Yankee|Pose|2008
Daddy Yankee|Lovumba|2011
Farruko|6 AM|2014
J Balvin|Bobo|2016
Maluma|Cuatro Babys|2016
Shakira|Perro Fiel|2017
Ozuna|El Farsante|2017
Karol G|Ahora Me Llama|2017
Becky G|Mayores|2017
CNCO|Hey DJ|2017
Karol G|Mi Cama|2018
Bad Bunny|MIA|2018
Enrique Iglesias|EL BAÑO|2018
Bad Bunny|Vete|2019
Bad Bunny|La Canción|2019
J Balvin|Blanco|2019
Maluma|11 PM|2019
Paulo Londra|Adán y Eva|2019
Camilo|Tutu|2019
Bad Bunny|Si Veo a Tu Mamá|2020
Bad Bunny|La Noche de Anoche|2020
Ozuna|Caramelo|2020
Sech|Relación|2020
Rauw Alejandro|Elegí|2020
Bad Bunny|Yonaguni|2021
Karol G|El Makinon|2021
Anitta|Envolver|2021
Maluma|Sobrio|2021
Bad Bunny|Moscow Mule|2022
Bad Bunny|Ojitos Lindos|2022
Bad Bunny|Efecto|2022
Ozuna|Hey Mor|2022
Bad Bunny|WHERE SHE GOES|2023
Bad Bunny|NUEVAYoL|2025
Bad Bunny|EoO|2025
`;

function parse(block, tag) {
  return block.trim().split('\n').map(l => {
    const [artist, title, year] = l.split('|');
    return { artist: artist.trim(), title: title.trim(), year: parseInt(year, 10), tag };
  }).filter(s => s.artist && s.title && s.year);
}

export const PLAYLISTS = {
  todos: { name: 'Todos los tiempos', songs: parse(TODOS, 'todos') },
  los40: { name: 'Los 40 Principales', songs: parse(LOS40, 'los40') },
  verano: { name: 'Hits del verano', songs: parse(VERANO, 'verano') },
  reggaeton: { name: 'Reguetón', songs: parse(REGGAETON, 'reggaeton') },
};

export const songKey = s => (s.artist + '|' + s.title).toLowerCase();

// Todas las canciones sin duplicados, para "Selecciona época"
export function allSongs() {
  const seen = new Map();
  for (const pl of Object.values(PLAYLISTS)) for (const s of pl.songs) {
    if (!seen.has(songKey(s))) seen.set(songKey(s), s);
  }
  return [...seen.values()];
}
