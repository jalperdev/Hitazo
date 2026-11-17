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
Elvis Presley|Love Me Tender|1956
Carl Perkins|Blue Suede Shoes|1956
Elvis Presley|It's Now or Never|1960
Elvis Presley|Return to Sender|1962
Chuck Berry|Roll Over Beethoven|1956
Chuck Berry|Maybellene|1955
Little Richard|Long Tall Sally|1956
Little Richard|Good Golly, Miss Molly|1958
Eddie Cochran|Summertime Blues|1958
Eddie Cochran|C'mon Everybody|1958
Buddy Holly|That'll Be the Day|1957
Buddy Holly|Everyday|1957
The Everly Brothers|All I Have to Do Is Dream|1958
The Everly Brothers|Wake Up Little Susie|1957
Ray Charles|Georgia on My Mind|1960
The Coasters|Yakety Yak|1958
Danny & The Juniors|At the Hop|1957
The Penguins|Earth Angel|1954
The Chordettes|Mr. Sandman|1954
The Chordettes|Lollipop|1958
Frankie Lymon & The Teenagers|Why Do Fools Fall in Love|1956
Bobby Darin|Splish Splash|1958
Bobby Darin|Mack the Knife|1959
Paul Anka|Put Your Head on My Shoulder|1959
Neil Sedaka|Oh! Carol|1959
Neil Sedaka|Breaking Up Is Hard to Do|1962
The Drifters|Save the Last Dance for Me|1960
The Drifters|Under the Boardwalk|1964
Roy Orbison|Oh, Pretty Woman|1964
Roy Orbison|Only the Lonely|1960
Roy Orbison|Crying|1961
Del Shannon|Runaway|1961
The Shirelles|Will You Love Me Tomorrow|1960
The Marvelettes|Please Mr. Postman|1961
The Ronettes|Be My Baby|1963
The Crystals|Then He Kissed Me|1963
The Chiffons|He's So Fine|1963
Little Eva|The Loco-Motion|1962
Booker T. & the M.G.'s|Green Onions|1962
The Tornados|Telstar|1962
Dick Dale|Misirlou|1962
The Surfaris|Wipe Out|1963
The Kingsmen|Louie Louie|1963
Martha and the Vandellas|Dancing in the Street|1964
Martha and the Vandellas|Heat Wave|1963
The Isley Brothers|Shout|1959
The Beatles|Twist and Shout|1963
The Beatles|Please Please Me|1963
The Beatles|Can't Buy Me Love|1964
The Beatles|A Hard Day's Night|1964
The Beatles|Ticket to Ride|1965
The Beatles|Eleanor Rigby|1966
The Beatles|Yellow Submarine|1966
The Beatles|All You Need Is Love|1967
The Beatles|Strawberry Fields Forever|1967
The Beatles|Penny Lane|1967
The Beatles|Ob-La-Di, Ob-La-Da|1968
The Beatles|Something|1969
The Rolling Stones|Jumpin' Jack Flash|1968
The Rolling Stones|Sympathy for the Devil|1968
The Rolling Stones|Gimme Shelter|1969
The Rolling Stones|Honky Tonk Women|1969
The Rolling Stones|Brown Sugar|1971
The Rolling Stones|Angie|1973
The Rolling Stones|Miss You|1978
The Rolling Stones|Start Me Up|1981
The Who|My Generation|1965
The Who|Pinball Wizard|1969
The Who|Baba O'Riley|1971
The Kinks|Sunny Afternoon|1966
The Kinks|Waterloo Sunset|1967
The Kinks|Lola|1970
The Beach Boys|I Get Around|1964
The Beach Boys|Wouldn't It Be Nice|1966
The Beach Boys|God Only Knows|1966
The Beach Boys|Kokomo|1988
The Byrds|Mr. Tambourine Man|1965
The Byrds|Turn! Turn! Turn!|1965
Bob Dylan|Blowin' in the Wind|1963
Bob Dylan|The Times They Are A-Changin'|1964
Bob Dylan|Knockin' on Heaven's Door|1973
Simon & Garfunkel|Scarborough Fair / Canticle|1966
Simon & Garfunkel|The Boxer|1969
Simon & Garfunkel|Cecilia|1970
The Mamas & The Papas|Monday, Monday|1966
Scott McKenzie|San Francisco (Be Sure to Wear Flowers in Your Hair)|1967
The Zombies|She's Not There|1964
The Zombies|Time of the Season|1968
The Spencer Davis Group|Gimme Some Lovin'|1966
Them|Gloria|1964
Van Morrison|Brown Eyed Girl|1967
The Hollies|Bus Stop|1966
Manfred Mann|Do Wah Diddy Diddy|1964
Herman's Hermits|I'm into Something Good|1964
The Searchers|Needles and Pins|1964
Petula Clark|Downtown|1964
Dusty Springfield|I Only Want to Be with You|1963
Sandie Shaw|Puppet on a String|1967
Lulu|To Sir with Love|1967
Frank Sinatra|Strangers in the Night|1966
Frank Sinatra|Somethin' Stupid|1967
Frank Sinatra|My Way|1969
Frank Sinatra|Theme from New York, New York|1980
Dean Martin|Volare|1958
Dean Martin|Everybody Loves Somebody|1964
Engelbert Humperdinck|Release Me|1967
Tom Jones|Delilah|1968
Tom Jones|She's a Lady|1971
Tom Jones|Sex Bomb|1999
Wilson Pickett|In the Midnight Hour|1965
Wilson Pickett|Land of 1000 Dances|1966
James Brown|I Got You (I Feel Good)|1965
James Brown|Papa's Got a Brand New Bag|1965
James Brown|Get Up (I Feel Like Being a) Sex Machine|1970
Sam & Dave|Soul Man|1967
Sam Cooke|Wonderful World|1960
Sam Cooke|A Change Is Gonna Come|1964
Otis Redding|Try a Little Tenderness|1966
Percy Sledge|When a Man Loves a Woman|1966
Aretha Franklin|(You Make Me Feel Like) A Natural Woman|1967
Aretha Franklin|Think|1968
Aretha Franklin|I Say a Little Prayer|1968
Etta James|At Last|1960
Marvin Gaye|Ain't No Mountain High Enough|1967
Marvin Gaye|Let's Get It On|1973
Marvin Gaye|Sexual Healing|1982
The Temptations|Papa Was a Rollin' Stone|1972
Four Tops|I Can't Help Myself (Sugar Pie Honey Bunch)|1965
Four Tops|Reach Out I'll Be There|1966
The Supremes|Stop! In the Name of Love|1965
The Supremes|You Can't Hurry Love|1966
Stevie Wonder|Signed, Sealed, Delivered (I'm Yours)|1970
Stevie Wonder|Isn't She Lovely|1976
Stevie Wonder|Master Blaster (Jammin')|1980
Stevie Wonder|I Just Called to Say I Love You|1984
Jackie Wilson|(Your Love Keeps Lifting Me) Higher and Higher|1967
Ike & Tina Turner|River Deep - Mountain High|1966
The Doors|Break On Through (To the Other Side)|1967
The Doors|People Are Strange|1967
The Doors|Riders on the Storm|1971
Jefferson Airplane|Somebody to Love|1967
Jefferson Airplane|White Rabbit|1967
Big Brother & The Holding Company|Piece of My Heart|1968
Janis Joplin|Me and Bobby McGee|1971
The Jimi Hendrix Experience|Hey Joe|1966
The Jimi Hendrix Experience|All Along the Watchtower|1968
Cream|Sunshine of Your Love|1967
Cream|White Room|1968
Steppenwolf|Born to Be Wild|1968
The Moody Blues|Nights in White Satin|1967
Joe Cocker|With a Little Help from My Friends|1968
Joe Cocker|You Can Leave Your Hat On|1986
Joe Cocker|Unchain My Heart|1987
Creedence Clearwater Revival|Fortunate Son|1969
Creedence Clearwater Revival|Down on the Corner|1969
Creedence Clearwater Revival|Have You Ever Seen the Rain|1970
Santana|Black Magic Woman|1970
Santana|Oye Como Va|1970
Santana|Smooth|1999
Sly & The Family Stone|Everyday People|1968
The 5th Dimension|Aquarius / Let the Sunshine In|1969
Zager & Evans|In the Year 2525|1969
Shocking Blue|Venus|1969
The Foundations|Build Me Up Buttercup|1968
Neil Diamond|Sweet Caroline|1969
Johnny Cash|I Walk the Line|1956
Johnny Cash|Ring of Fire|1963
Johnny Cash|Hurt|2002
Patsy Cline|Crazy|1961
Dolly Parton|Jolene|1973
Dolly Parton|9 to 5|1980
Kenny Rogers|The Gambler|1978
Kenny Rogers|Islands in the Stream|1983
Glen Campbell|Rhinestone Cowboy|1975
John Denver|Take Me Home, Country Roads|1971
Marisol|Tómbola|1962
Raphael|Mi gran noche|1967
Julio Iglesias|La vida sigue igual|1968
Julio Iglesias|Hey!|1980
Miguel Ríos|Himno de la alegría|1969
Joan Manuel Serrat|Penélope|1969
Joan Manuel Serrat|Mediterráneo|1971
Joan Manuel Serrat|Lucía|1971
Karina|En un mundo nuevo|1971
Cecilia|Dama, dama|1972
Cecilia|Un ramito de violetas|1975
Manolo Escobar|Mi carro|1969
Camilo Sesto|¿Quieres ser mi amante?|1974
Camilo Sesto|Melina|1975
Camilo Sesto|Perdóname|1980
Jarcha|Libertad sin ira|1976
Pablo Abraira|Gavilán o paloma|1977
Miguel Bosé|Te amaré|1980
Rocío Dúrcal|La gata bajo la lluvia|1981
Rocío Jurado|Como una ola|1981
José Luis Perales|¿Y cómo es él?|1982
Isabel Pantoja|Marinero de luces|1985
Juan Gabriel|Querida|1984
Juan Gabriel|Amor eterno|1984
José José|El triste|1970
Nino Bravo|América, América|1973
Los Chunguitos|Dame veneno|1977
Las Grecas|Te estoy amando locamente|1974
Triana|Abre la puerta|1975
Medina Azahara|Paseando por la Mezquita|1979
Burning|¿Qué hace una chica como tú en un sitio como este?|1978
Sergio y Estíbaliz|Tú volverás|1975
Mocedades|Amor de hombre|1982
Carole King|You've Got a Friend|1971
James Taylor|Fire and Rain|1970
Cat Stevens|Wild World|1970
Cat Stevens|Father and Son|1970
Neil Young|Heart of Gold|1972
Neil Young|Rockin' in the Free World|1989
America|A Horse with No Name|1971
Eagles|Take It Easy|1972
Eagles|Desperado|1973
Fleetwood Mac|Landslide|1975
Fleetwood Mac|Go Your Own Way|1977
Fleetwood Mac|The Chain|1977
Fleetwood Mac|Everywhere|1987
The Doobie Brothers|Long Train Runnin'|1973
Lynyrd Skynyrd|Free Bird|1973
ZZ Top|La Grange|1973
ZZ Top|Gimme All Your Lovin'|1983
Bachman-Turner Overdrive|You Ain't Seen Nothing Yet|1974
Blue Swede|Hooked on a Feeling|1974
Redbone|Come and Get Your Love|1974
Steve Miller Band|The Joker|1973
Steve Miller Band|Fly Like an Eagle|1976
Boston|More Than a Feeling|1976
Foreigner|Cold as Ice|1977
Foreigner|I Want to Know What Love Is|1984
Kansas|Carry On Wayward Son|1976
Kansas|Dust in the Wind|1977
Toto|Hold the Line|1978
Toto|Rosanna|1982
Meat Loaf|Paradise by the Dashboard Light|1977
Meat Loaf|I'd Do Anything for Love (But I Won't Do That)|1993
Bruce Springsteen|Born to Run|1975
Bruce Springsteen|I'm on Fire|1984
Bruce Springsteen|Streets of Philadelphia|1993
Billy Joel|Piano Man|1973
Billy Joel|Uptown Girl|1983
Billy Joel|We Didn't Start the Fire|1989
Elton John|Tiny Dancer|1971
Elton John|Bennie and the Jets|1973
Elton John|Goodbye Yellow Brick Road|1973
Elton John|Don't Go Breaking My Heart|1976
Elton John|I'm Still Standing|1983
Elton John|Sacrifice|1989
Elton John|Can You Feel the Love Tonight|1994
Elton John|Cold Heart - PNAU Remix|2021
David Bowie|Changes|1971
David Bowie|Life on Mars?|1971
David Bowie|Starman|1972
David Bowie|Let's Dance|1983
Queen|Under Pressure|1981
Queen|Killer Queen|1974
Queen|Somebody to Love|1976
Queen|We Are the Champions|1977
Queen|Bicycle Race|1978
Queen|Crazy Little Thing Called Love|1979
Queen|A Kind of Magic|1986
Queen|Who Wants to Live Forever|1986
Queen|Innuendo|1991
T. Rex|Get It On|1971
T. Rex|20th Century Boy|1973
Slade|Cum On Feel the Noize|1973
Sweet|Ballroom Blitz|1973
Suzi Quatro|Can the Can|1973
Mud|Tiger Feet|1974
Roxy Music|Love Is the Drug|1975
10cc|I'm Not in Love|1975
Electric Light Orchestra|Livin' Thing|1976
Electric Light Orchestra|Don't Bring Me Down|1979
Supertramp|Dreamer|1974
Supertramp|Breakfast in America|1979
Supertramp|Goodbye Stranger|1979
Supertramp|It's Raining Again|1982
Pink Floyd|Money|1973
Pink Floyd|Time|1973
Pink Floyd|Comfortably Numb|1979
Led Zeppelin|Immigrant Song|1970
Led Zeppelin|Black Dog|1971
Led Zeppelin|Kashmir|1975
Deep Purple|Highway Star|1972
Black Sabbath|Paranoid|1970
Black Sabbath|Iron Man|1970
Thin Lizzy|Whiskey in the Jar|1972
Thin Lizzy|The Boys Are Back in Town|1976
AC/DC|T.N.T.|1975
AC/DC|It's a Long Way to the Top (If You Wanna Rock 'n' Roll)|1975
AC/DC|You Shook Me All Night Long|1980
AC/DC|Hells Bells|1980
AC/DC|Thunderstruck|1990
Aerosmith|Dream On|1973
Aerosmith|Walk This Way|1975
Aerosmith|Crazy|1993
Aerosmith|I Don't Want to Miss a Thing|1998
KISS|Rock and Roll All Nite|1975
Alice Cooper|School's Out|1972
Ramones|I Wanna Be Sedated|1978
The Clash|Should I Stay or Should I Go|1982
The Clash|Rock the Casbah|1982
Sex Pistols|Anarchy in the U.K.|1976
The Jam|Going Underground|1980
Buzzcocks|Ever Fallen in Love (With Someone You Shouldn't've)|1978
Talking Heads|Psycho Killer|1977
Talking Heads|Once in a Lifetime|1980
Talking Heads|Road to Nowhere|1985
Patti Smith|Because the Night|1978
Blondie|One Way or Another|1978
Blondie|Atomic|1979
Blondie|The Tide Is High|1980
Blondie|Maria|1999
The Cars|Just What I Needed|1978
The Cars|Drive|1984
The Police|Roxanne|1978
The Police|Walking on the Moon|1979
The Police|Every Little Thing She Does Is Magic|1981
Sting|Englishman in New York|1987
Sting|Fields of Gold|1993
Sting|Shape of My Heart|1993
Dire Straits|Romeo and Juliet|1980
Dire Straits|Walk of Life|1985
Dire Straits|Brothers in Arms|1985
Bee Gees|You Should Be Dancing|1976
Bee Gees|Night Fever|1977
Bee Gees|More Than a Woman|1977
Bee Gees|Tragedy|1979
Donna Summer|Love to Love You Baby|1975
Donna Summer|Hot Stuff|1979
Donna Summer|Bad Girls|1979
Chic|Good Times|1979
Sister Sledge|We Are Family|1979
Sister Sledge|Lost in Music|1979
Diana Ross|Ain't No Mountain High Enough|1970
Diana Ross|Upside Down|1980
Diana Ross|I'm Coming Out|1980
The Trammps|Disco Inferno|1976
Anita Ward|Ring My Bell|1979
Earth, Wind & Fire|Boogie Wonderland|1979
Earth, Wind & Fire|Let's Groove|1981
Kool & The Gang|Ladies' Night|1979
Kool & The Gang|Get Down On It|1981
Kool & The Gang|Cherish|1985
The Jacksons|Blame It on the Boogie|1978
The Jacksons|Can You Feel It|1980
Michael Jackson|Rock with You|1979
Michael Jackson|Off the Wall|1979
Michael Jackson|Wanna Be Startin' Somethin'|1982
Michael Jackson|Thriller|1982
Michael Jackson|Bad|1987
Michael Jackson|The Way You Make Me Feel|1987
Michael Jackson|Man in the Mirror|1987
Michael Jackson|Smooth Criminal|1987
Michael Jackson|Black or White|1991
Michael Jackson|Remember the Time|1991
Michael Jackson|They Don't Care About Us|1995
Michael Jackson|Earth Song|1995
Rick James|Super Freak|1981
Village People|Macho Man|1978
Village People|In the Navy|1979
Village People|Go West|1979
Boney M.|Sunny|1976
Boney M.|Ma Baker|1977
Boney M.|Brown Girl in the Ring|1978
Boney M.|Hooray! Hooray! It's a Holi-Holiday|1979
ABBA|SOS|1975
ABBA|Fernando|1976
ABBA|Money, Money, Money|1976
ABBA|Knowing Me, Knowing You|1977
ABBA|Take a Chance on Me|1977
ABBA|Voulez-Vous|1979
ABBA|The Winner Takes It All|1980
ABBA|Super Trouper|1980
ABBA|Lay All Your Love on Me|1980
Baccara|Sorry, I'm a Lady|1977
Ottawan|D.I.S.C.O.|1979
Ottawan|Hands Up (Give Me Your Heart)|1980
Barry White|Can't Get Enough of Your Love, Babe|1974
Hot Chocolate|You Sexy Thing|1975
Hot Chocolate|It Started with a Kiss|1982
Leo Sayer|You Make Me Feel Like Dancing|1976
Billy Ocean|Caribbean Queen (No More Love on the Run)|1984
Billy Ocean|When the Going Gets Tough, the Tough Get Going|1985
Billy Ocean|Get Outta My Dreams, Get into My Car|1988
Commodores|Easy|1977
Commodores|Nightshift|1985
Lionel Richie|Say You, Say Me|1985
Lionel Richie|Dancing on the Ceiling|1986
Whitney Houston|How Will I Know|1985
Whitney Houston|Greatest Love of All|1985
Whitney Houston|One Moment in Time|1988
Whitney Houston|I'm Every Woman|1992
Tina Turner|What's Love Got to Do with It|1984
Tina Turner|Private Dancer|1984
Tina Turner|We Don't Need Another Hero (Thunderdome)|1985
Tina Turner|The Best|1989
Cyndi Lauper|Time After Time|1983
Cyndi Lauper|True Colors|1986
Madonna|Holiday|1983
Madonna|Material Girl|1984
Madonna|Into the Groove|1985
Madonna|Papa Don't Preach|1986
Madonna|Vogue|1990
Madonna|Music|2000
Madonna|Hung Up|2005
Madonna|4 Minutes|2008
Prince|1999|1982
Prince|When Doves Cry|1984
Prince|Let's Go Crazy|1984
Prince|Raspberry Beret|1985
Prince|Cream|1991
Sinéad O'Connor|Nothing Compares 2 U|1990
Kim Carnes|Bette Davis Eyes|1981
Olivia Newton-John|Physical|1981
John Travolta|You're the One That I Want|1978
John Travolta|Summer Nights|1978
Pat Benatar|Hit Me with Your Best Shot|1980
Joan Jett & The Blackhearts|I Love Rock 'N Roll|1981
The Human League|Don't You Want Me|1981
Soft Cell|Tainted Love|1981
Visage|Fade to Grey|1980
Ultravox|Vienna|1980
Spandau Ballet|True|1983
Spandau Ballet|Gold|1983
Duran Duran|Hungry Like the Wolf|1982
Duran Duran|Rio|1982
Duran Duran|Ordinary World|1993
Culture Club|Do You Really Want to Hurt Me|1982
Culture Club|Karma Chameleon|1983
Frankie Goes to Hollywood|Relax|1983
Frankie Goes to Hollywood|Two Tribes|1984
Dexys Midnight Runners|Come On Eileen|1982
Madness|One Step Beyond|1979
Madness|Our House|1982
UB40|Kingston Town|1989
Men at Work|Down Under|1981
INXS|Need You Tonight|1987
INXS|Never Tear Us Apart|1987
Crowded House|Don't Dream It's Over|1986
Simple Minds|Alive and Kicking|1985
Tears for Fears|Mad World|1982
Tears for Fears|Shout|1984
Eurythmics|Here Comes the Rain Again|1983
Eurythmics|There Must Be an Angel (Playing with My Heart)|1985
Annie Lennox|Why|1992
Pet Shop Boys|It's a Sin|1987
Pet Shop Boys|Always on My Mind|1987
Pet Shop Boys|Go West|1993
Erasure|A Little Respect|1988
Yazoo|Only You|1982
Depeche Mode|People Are People|1984
Depeche Mode|Personal Jesus|1989
New Order|Blue Monday|1983
New Order|Bizarre Love Triangle|1986
Joy Division|Love Will Tear Us Apart|1980
The Smiths|This Charming Man|1983
The Smiths|There Is a Light That Never Goes Out|1986
The Cure|Close to Me|1985
The Cure|Just Like Heaven|1987
The Cure|Lovesong|1989
Talk Talk|It's My Life|1984
Talk Talk|Such a Shame|1984
Nena|99 Luftballons|1983
Alphaville|Big in Japan|1984
Alphaville|Forever Young|1984
Kajagoogoo|Too Shy|1983
Bronski Beat|Smalltown Boy|1984
Bananarama|Venus|1986
Kylie Minogue|The Loco-Motion|1987
Kylie Minogue|Spinning Around|2000
Kylie Minogue|Love at First Sight|2001
Belinda Carlisle|Heaven Is a Place on Earth|1987
The Bangles|Manic Monday|1986
The Bangles|Eternal Flame|1988
Bon Jovi|You Give Love a Bad Name|1986
Bon Jovi|Wanted Dead or Alive|1986
Bon Jovi|Bed of Roses|1992
Bon Jovi|Always|1994
Def Leppard|Pour Some Sugar on Me|1987
Def Leppard|Love Bites|1987
Scorpions|Still Loving You|1984
Scorpions|Rock You Like a Hurricane|1984
Scorpions|Wind of Change|1990
Whitesnake|Here I Go Again|1987
Mötley Crüe|Kickstart My Heart|1989
Poison|Every Rose Has Its Thorn|1988
Twisted Sister|We're Not Gonna Take It|1984
Iron Maiden|Run to the Hills|1982
Iron Maiden|The Trooper|1983
Metallica|Master of Puppets|1986
Metallica|One|1988
Ozzy Osbourne|Crazy Train|1980
Van Halen|Panama|1984
Survivor|Burning Heart|1985
Starship|We Built This City|1985
Starship|Nothing's Gonna Stop Us Now|1987
Heart|Alone|1987
REO Speedwagon|Keep On Loving You|1980
Journey|Separate Ways (Worlds Apart)|1983
Huey Lewis & The News|The Power of Love|1985
Huey Lewis & The News|Hip to Be Square|1986
Bryan Adams|Run to You|1984
Bryan Adams|Heaven|1984
Phil Collins|You Can't Hurry Love|1982
Phil Collins|Against All Odds (Take a Look at Me Now)|1984
Philip Bailey|Easy Lover|1984
Phil Collins|Another Day in Paradise|1989
Genesis|Invisible Touch|1986
Genesis|Land of Confusion|1986
Peter Gabriel|Sledgehammer|1986
Peter Gabriel|In Your Eyes|1986
Paul Simon|You Can Call Me Al|1986
Wings|Live and Let Die|1973
Wings|Band on the Run|1973
Paul McCartney|Ebony and Ivory|1982
John Lennon|Jealous Guy|1971
John Lennon|Woman|1980
George Harrison|Got My Mind Set on You|1987
Steve Winwood|Higher Love|1986
Robert Palmer|Addicted to Love|1985
Simply Red|Holding Back the Years|1985
Simply Red|If You Don't Know Me by Now|1989
Simply Red|Stars|1991
Level 42|Lessons in Love|1986
George Michael|Faith|1987
George Michael|Father Figure|1987
George Michael|Freedom! '90|1990
George Michael|Fastlove|1996
Wham!|Freedom|1984
Chris de Burgh|The Lady in Red|1986
Rick Astley|Together Forever|1987
Mr. Mister|Broken Wings|1985
Kenny Loggins|Danger Zone|1986
Irene Cara|Fame|1980
Harold Faltermeyer|Axel F|1984
Europe|Carrie|1986
Roxette|The Look|1988
Roxette|Listen to Your Heart|1988
Roxette|Dressed for Success|1988
Roxette|Joyride|1991
a-ha|The Sun Always Shines on T.V.|1985
a-ha|Hunting High and Low|1985
Kim Wilde|Kids in America|1981
Kim Wilde|You Keep Me Hangin' On|1986
Samantha Fox|Touch Me (I Want Your Body)|1986
Sabrina|Boys (Summertime Love)|1987
Spagna|Call Me|1987
Baltimora|Tarzan Boy|1985
Righeira|Vamos a la playa|1983
Gazebo|I Like Chopin|1983
Ryan Paris|Dolce Vita|1983
Laid Back|Sunshine Reggae|1983
Desireless|Voyage, voyage|1986
Rick Springfield|Jessie's Girl|1981
Toni Basil|Mickey|1981
Hall & Oates|You Make My Dreams|1980
Hall & Oates|Maneater|1982
Billy Idol|White Wedding|1982
Billy Idol|Rebel Yell|1983
U2|Pride (In the Name of Love)|1984
U2|I Still Haven't Found What I'm Looking For|1987
U2|Where the Streets Have No Name|1987
U2|One|1991
U2|Beautiful Day|2000
U2|Vertigo|2004
R.E.M.|The One I Love|1987
R.E.M.|Shiny Happy People|1991
R.E.M.|Everybody Hurts|1992
R.E.M.|Man on the Moon|1992
Guns N' Roses|Paradise City|1987
Guns N' Roses|Don't Cry|1991
Bruce Springsteen|Glory Days|1984
Nirvana|Lithium|1991
Nirvana|In Bloom|1991
Nirvana|Heart-Shaped Box|1993
Pearl Jam|Alive|1991
Pearl Jam|Jeremy|1991
Pearl Jam|Black|1991
Soundgarden|Black Hole Sun|1994
Alice In Chains|Man in the Box|1990
Stone Temple Pilots|Plush|1992
The Smashing Pumpkins|1979|1995
The Smashing Pumpkins|Tonight, Tonight|1995
The Smashing Pumpkins|Bullet with Butterfly Wings|1995
Foo Fighters|Everlong|1997
Foo Fighters|Learn to Fly|1999
Foo Fighters|Best of You|2005
Foo Fighters|The Pretender|2007
Red Hot Chili Peppers|Give It Away|1991
Red Hot Chili Peppers|Scar Tissue|1999
Red Hot Chili Peppers|Otherside|1999
Red Hot Chili Peppers|By the Way|2002
Red Hot Chili Peppers|Can't Stop|2002
Red Hot Chili Peppers|Snow (Hey Oh)|2006
Rage Against The Machine|Killing in the Name|1992
Green Day|When I Come Around|1994
Green Day|Good Riddance (Time of Your Life)|1997
Green Day|American Idiot|2004
Green Day|Boulevard of Broken Dreams|2004
Green Day|Wake Me Up When September Ends|2004
The Offspring|Self Esteem|1994
The Offspring|The Kids Aren't Alright|1998
blink-182|All the Small Things|1999
blink-182|What's My Age Again?|1999
Weezer|Buddy Holly|1994
Weezer|Say It Ain't So|1994
Radiohead|High and Dry|1995
Radiohead|Karma Police|1997
Radiohead|No Surprises|1997
Oasis|Live Forever|1994
Oasis|Champagne Supernova|1995
Oasis|Stand by Me|1997
Oasis|Stop Crying Your Heart Out|2002
Blur|Girls & Boys|1994
Blur|Parklife|1994
Blur|Coffee & TV|1999
Pulp|Common People|1995
The Verve|Lucky Man|1997
Placebo|Pure Morning|1998
Placebo|Every You Every Me|1998
Garbage|Only Happy When It Rains|1995
Garbage|Stupid Girl|1995
The Cranberries|Dreams|1992
The Cardigans|Lovefool|1996
The Cardigans|My Favourite Game|1998
Texas|Say What You Want|1997
Texas|Summer Son|1999
Sixpence None The Richer|Kiss Me|1997
Alanis Morissette|You Oughta Know|1995
Alanis Morissette|Hand in My Pocket|1995
Sheryl Crow|All I Wanna Do|1993
Sheryl Crow|Soak Up the Sun|2002
Meredith Brooks|Bitch|1997
4 Non Blondes|What's Up?|1992
Counting Crows|Mr. Jones|1993
Matchbox Twenty|Push|1996
Goo Goo Dolls|Iris|1998
Third Eye Blind|Semi-Charmed Life|1997
Semisonic|Closing Time|1998
Savage Garden|I Want You|1996
Savage Garden|Truly Madly Deeply|1997
Lenny Kravitz|It Ain't Over 'til It's Over|1991
Lenny Kravitz|Are You Gonna Go My Way|1993
Lenny Kravitz|Fly Away|1998
Seal|Crazy|1990
Seal|Kiss from a Rose|1994
Des'ree|You Gotta Be|1994
Toni Braxton|Un-Break My Heart|1996
Mariah Carey|Hero|1993
Mariah Carey|Without You|1993
Mariah Carey|Fantasy|1995
Mariah Carey|We Belong Together|2005
Celine Dion|The Power of Love|1993
Celine Dion|Because You Loved Me|1996
Celine Dion|It's All Coming Back to Me Now|1996
Boyz II Men|End of the Road|1992
Boyz II Men|I'll Make Love to You|1994
TLC|Creep|1994
TLC|Waterfalls|1995
Destiny's Child|Say My Name|1999
Destiny's Child|Independent Women, Pt. 1|2000
Destiny's Child|Survivor|2001
Destiny's Child|Bootylicious|2001
Ms. Lauryn Hill|Doo Wop (That Thing)|1998
Fugees|Ready or Not|1996
Dr. Dre|Nuthin' but a "G" Thang|1992
Dr. Dre|Still D.R.E.|1999
Snoop Dogg|Gin and Juice|1993
Snoop Dogg|Drop It Like It's Hot|2004
2Pac|Dear Mama|1995
2Pac|Changes|1998
The Notorious B.I.G.|Juicy|1994
The Notorious B.I.G.|Hypnotize|1997
Puff Daddy|I'll Be Missing You|1997
Warren G|Regulate|1994
House Of Pain|Jump Around|1992
Will Smith|Gettin' Jiggy wit It|1997
Will Smith|Miami|1997
Montell Jordan|This Is How We Do It|1995
Mark Morrison|Return of the Mack|1996
Shaggy|Angel|2000
Ini Kamoze|Here Comes the Hotstepper|1994
Snow|Informer|1992
UB40|(I Can't Help) Falling in Love with You|1993
Bob Marley & The Wailers|Jamming|1977
Bob Marley & The Wailers|Three Little Birds|1977
Bob Marley & The Wailers|One Love / People Get Ready|1977
Bob Marley & The Wailers|Is This Love|1978
Bob Marley & The Wailers|Buffalo Soldier|1983
Captain Hollywood Project|More and More|1992
La Bouche|Be My Lover|1995
Real McCoy|Another Night|1993
2 Unlimited|Get Ready for This|1991
Snap!|The Power|1990
Black Box|Ride on Time|1989
C+C Music Factory|Gonna Make You Sweat (Everybody Dance Now)|1990
Ace of Base|Happy Nation|1992
Ace of Base|Beautiful Life|1995
Haddaway|Life|1993
Mr. President|Coco Jamboo|1996
Scatman John|Scatman (ski-ba-bop-ba-dop-bop)|1994
Rednex|Cotton Eye Joe|1994
ATB|9 PM (Till I Come)|1998
Darude|Sandstorm|1999
Robert Miles|Children|1995
Faithless|Insomnia|1995
Faithless|God Is a DJ|1998
The Prodigy|Firestarter|1996
The Prodigy|Breathe|1996
The Chemical Brothers|Block Rockin' Beats|1997
Fatboy Slim|The Rockafeller Skank|1998
Fatboy Slim|Praise You|1998
Fatboy Slim|Right Here, Right Now|1999
Moby|Porcelain|1999
Moby|Why Does My Heart Feel So Bad?|1999
Daft Punk|Around the World|1997
Daft Punk|Harder, Better, Faster, Stronger|2001
Stardust|Music Sounds Better with You|1998
Spiller|Groovejet (If This Ain't Love)|2000
Jamiroquai|Virtual Insanity|1996
Jamiroquai|Cosmic Girl|1996
Jamiroquai|Canned Heat|1999
Britney Spears|Oops!...I Did It Again|2000
Britney Spears|I'm a Slave 4 U|2001
Britney Spears|Womanizer|2008
Britney Spears|Circus|2008
Christina Aguilera|Genie in a Bottle|1999
Christina Aguilera|Lady Marmalade|2001
Christina Aguilera|Dirrty|2002
Christina Aguilera|Beautiful|2002
Christina Aguilera|Candyman|2006
*NSYNC|Bye Bye Bye|2000
*NSYNC|It's Gonna Be Me|2000
Backstreet Boys|As Long as You Love Me|1997
Backstreet Boys|Larger than Life|1999
Backstreet Boys|Show Me the Meaning of Being Lonely|1999
Spice Girls|Say You'll Be There|1996
Spice Girls|2 Become 1|1996
Spice Girls|Spice Up Your Life|1997
Westlife|Flying Without Wings|1999
Take That|Back for Good|1995
Take That|Patience|2006
Robbie Williams|Let Me Entertain You|1997
Robbie Williams|Millennium|1998
Robbie Williams|Rock DJ|2000
Robbie Williams|Somethin' Stupid|2001
All Saints|Never Ever|1997
All Saints|Pure Shores|2000
Geri Halliwell|It's Raining Men|2001
Aqua|Doctor Jones|1997
Aqua|Cartoon Heroes|2000
Eiffel 65|Move Your Body|1999
Ricky Martin|She Bangs|2000
Jennifer Lopez|If You Had My Love|1999
Jennifer Lopez|Waiting for Tonight|1999
Jennifer Lopez|Let's Get Loud|1999
Jennifer Lopez|Jenny from the Block|2002
Enrique Iglesias|Hero|2001
Enrique Iglesias|Escape|2001
Gloria Estefan|Rhythm Is Gonna Get You|1987
Gloria Estefan|Mi tierra|1993
Marc Anthony|I Need to Know|1999
Shakira|Underneath Your Clothes|2001
Shakira|Objection (Tango)|2001
Shakira|She Wolf|2009
Shakira|Can't Remember to Forget You|2014
Shakira|Try Everything|2016
Eminem|My Name Is|1999
Eminem|Stan|2000
Eminem|Mockingbird|2004
Eminem|Love the Way You Lie|2010
Eminem|Not Afraid|2010
50 Cent|21 Questions|2003
50 Cent|Candy Shop|2005
Nelly|Hot in Herre|2002
Nelly|Dilemma|2002
Missy Elliott|Get Ur Freak On|2001
Missy Elliott|Work It|2002
Kanye West|Gold Digger|2005
Kanye West|Stronger|2007
Kanye West|Heartless|2008
JAY-Z|99 Problems|2003
JAY-Z|Empire State of Mind|2009
Alicia Keys|Fallin'|2001
Alicia Keys|If I Ain't Got You|2003
Alicia Keys|No One|2007
Usher|Burn|2004
Usher|OMG|2010
Usher|DJ Got Us Fallin' in Love|2010
Akon|Lonely|2004
Akon|Smack That|2006
Rihanna|Pon de Replay|2005
Rihanna|SOS|2006
Rihanna|Don't Stop the Music|2007
Rihanna|Disturbia|2008
Rihanna|Only Girl (In the World)|2010
Rihanna|Rude Boy|2010
Rihanna|Stay|2012
Rihanna|Work|2016
Beyoncé|Irreplaceable|2006
Beyoncé|Halo|2008
Beyoncé|Run the World (Girls)|2011
Beyoncé|Drunk in Love|2013
Beyoncé|Formation|2016
Beyoncé|CUFF IT|2022
Beyoncé|TEXAS HOLD 'EM|2024
Gwen Stefani|Hollaback Girl|2005
Gwen Stefani|The Sweet Escape|2006
The Pussycat Dolls|Don't Cha|2005
The Pussycat Dolls|Buttons|2006
Fergie|Glamorous|2006
Fergie|Big Girls Don't Cry|2006
Black Eyed Peas|Shut Up|2003
Black Eyed Peas|Let's Get It Started|2004
Black Eyed Peas|Pump It|2005
Black Eyed Peas|My Humps|2005
Black Eyed Peas|Boom Boom Pow|2009
Black Eyed Peas|The Time (Dirty Bit)|2010
P!nk|Get the Party Started|2001
P!nk|Just Like a Pill|2001
P!nk|So What|2008
P!nk|Just Give Me a Reason|2012
Kelly Clarkson|Since U Been Gone|2004
Kelly Clarkson|Because of You|2004
Kelly Clarkson|Stronger (What Doesn't Kill You)|2011
Avril Lavigne|I'm with You|2002
Avril Lavigne|My Happy Ending|2004
Avril Lavigne|Girlfriend|2007
Natasha Bedingfield|Unwritten|2004
Natasha Bedingfield|These Words|2004
Dido|Thank You|1999
Dido|White Flag|2003
Norah Jones|Don't Know Why|2002
Nelly Furtado|I'm Like a Bird|2000
Nelly Furtado|All Good Things (Come to an End)|2006
Jason Mraz|I'm Yours|2008
John Legend|All of Me|2013
Maroon 5|This Love|2002
Maroon 5|She Will Be Loved|2002
Maroon 5|Payphone|2012
Maroon 5|Girls Like You|2017
Maroon 5|Memories|2019
Timbaland|Apologize|2007
Timbaland|The Way I Are|2007
Justin Timberlake|Cry Me a River|2002
Justin Timberlake|Rock Your Body|2002
Justin Timberlake|My Love|2006
Justin Timberlake|Mirrors|2013
Justin Timberlake|CAN'T STOP THE FEELING!|2016
Coldplay|The Scientist|2002
Coldplay|Fix You|2005
Coldplay|Speed of Sound|2005
Coldplay|Paradise|2011
Coldplay|Hymn for the Weekend|2015
Coldplay|My Universe|2021
The Chainsmokers|Something Just Like This|2017
The Chainsmokers|Don't Let Me Down|2016
The Chainsmokers|Closer|2016
Keane|Somewhere Only We Know|2004
Snow Patrol|Chasing Cars|2006
The Fray|How to Save a Life|2005
Muse|Hysteria|2003
Muse|Supermassive Black Hole|2006
Muse|Starlight|2006
Muse|Uprising|2009
Arctic Monkeys|I Bet You Look Good on the Dancefloor|2005
Arctic Monkeys|505|2007
Arctic Monkeys|R U Mine?|2012
Arctic Monkeys|Do I Wanna Know?|2013
The Strokes|Last Nite|2001
The Strokes|Reptilia|2003
Kaiser Chiefs|Ruby|2007
Kasabian|Fire|2009
The Killers|Somebody Told Me|2004
The Killers|When You Were Young|2006
The Killers|Human|2008
Jet|Are You Gonna Be My Girl|2003
Audioslave|Like a Stone|2002
System Of A Down|Chop Suey!|2001
System Of A Down|Toxicity|2001
Linkin Park|Crawling|2000
Linkin Park|Somewhere I Belong|2003
Linkin Park|Faint|2003
Linkin Park|What I've Done|2007
Evanescence|My Immortal|2003
Nickelback|How You Remind Me|2001
Nickelback|Rockstar|2005
3 Doors Down|Kryptonite|2000
Papa Roach|Last Resort|2000
The Calling|Wherever You Will Go|2001
Train|Drops of Jupiter (Tell Me)|2001
Train|Hey, Soul Sister|2009
Daniel Powter|Bad Day|2005
James Morrison|You Give Me Something|2006
Amy Macdonald|This Is the Life|2007
Adele|Chasing Pavements|2008
Adele|Set Fire to the Rain|2011
Adele|Skyfall|2012
Adele|When We Were Young|2015
Adele|Easy on Me|2021
Florence + The Machine|Dog Days Are Over|2008
Florence + The Machine|You've Got the Love|2009
Lily Allen|Smile|2006
MIKA|Grace Kelly|2007
Scissor Sisters|I Don't Feel Like Dancin'|2006
The Ting Tings|That's Not My Name|2008
Katy Perry|Hot n Cold|2008
Katy Perry|California Gurls|2010
Katy Perry|Teenage Dream|2010
Katy Perry|Firework|2010
Katy Perry|Roar|2013
Katy Perry|Dark Horse|2013
Lady Gaga|Paparazzi|2008
Lady Gaga|Telephone|2009
Lady Gaga|Alejandro|2009
Lady Gaga|Born This Way|2011
Lady Gaga|Bloody Mary|2011
Lady Gaga|Shallow|2018
Kesha|TiK ToK|2009
Owl City|Fireflies|2009
Jason Derulo|Whatcha Say|2009
Jason Derulo|Talk Dirty|2013
Jason Derulo|Want to Want Me|2015
Flo Rida|Right Round|2009
Flo Rida|Club Can't Handle Me|2010
Flo Rida|Whistle|2012
Pitbull|Hotel Room Service|2009
David Guetta|Memories|2009
David Guetta|Without You|2011
David Guetta|Hey Mama|2014
David Guetta|I'm Good (Blue)|2022
Swedish House Mafia|Save the World|2011
Swedish House Mafia|Don't You Worry Child|2012
Avicii|Hey Brother|2013
Avicii|The Nights|2014
Avicii|Waiting For Love|2015
Avicii|Without You|2017
Calvin Harris|Feel So Close|2011
Calvin Harris|Sweet Nothing|2012
Calvin Harris|Blame|2014
Martin Garrix|Animals|2013
Martin Garrix|Scared to Be Lonely|2017
Zedd|Clarity|2012
DJ Snake|Turn Down for What|2013
DJ Snake|Let Me Love You|2016
Martin Solveig|Hello|2010
Bastille|Pompeii|2013
Of Monsters and Men|Little Talks|2011
Mumford & Sons|Little Lion Man|2009
The Lumineers|Ho Hey|2012
Vance Joy|Riptide|2013
George Ezra|Budapest|2014
George Ezra|Shotgun|2018
Ed Sheeran|The A Team|2011
Ed Sheeran|Photograph|2014
Ed Sheeran|Castle on the Hill|2017
Ed Sheeran|Galway Girl|2017
Ed Sheeran|Bad Habits|2021
Ed Sheeran|Azizam|2025
Sam Smith|Stay with Me|2014
Sam Smith|Writing's on the Wall|2015
Sam Smith|Too Good at Goodbyes|2017
Sam Smith|Unholy|2022
Ellie Goulding|Lights|2010
Ellie Goulding|Burn|2013
Ellie Goulding|Love Me Like You Do|2015
Jessie J|Price Tag|2011
Jessie J|Domino|2011
Jessie J|Bang Bang|2014
Ariana Grande|Problem|2014
Ariana Grande|Into You|2016
Ariana Grande|Side to Side|2016
Ariana Grande|thank u, next|2018
Ariana Grande|7 rings|2019
Ariana Grande|positions|2020
Ariana Grande|we can't be friends (wait for your love)|2024
Meghan Trainor|All About That Bass|2014
Selena Gomez|Come & Get It|2013
Selena Gomez|Lose You To Love Me|2019
Demi Lovato|Sorry Not Sorry|2017
Charlie Puth|Attention|2017
Wiz Khalifa|Black and Yellow|2010
Wiz Khalifa|See You Again|2015
Shawn Mendes|Stitches|2015
Shawn Mendes|There's Nothing Holdin' Me Back|2017
Shawn Mendes|In My Blood|2018
Justin Bieber|Baby|2010
Justin Bieber|What Do You Mean?|2015
Justin Bieber|Peaches|2021
Justin Bieber|Ghost|2021
Justin Bieber|DAISIES|2025
The Kid LAROI|STAY|2021
Post Malone|Congratulations|2016
Post Malone|rockstar|2017
Post Malone|Sunflower|2018
Post Malone|Circles|2019
Drake|Hotline Bling|2015
Drake|One Dance|2016
Drake|God's Plan|2018
Drake|In My Feelings|2018
Kendrick Lamar|HUMBLE.|2017
Kendrick Lamar|Not Like Us|2024
Kendrick Lamar|luther|2024
Travis Scott|goosebumps|2016
Travis Scott|SICKO MODE|2018
Macklemore & Ryan Lewis|Thrift Shop|2012
Robin Thicke|Blurred Lines|2013
Icona Pop|I Love It|2012
Nicki Minaj|Super Bass|2011
Nicki Minaj|Starships|2012
Nicki Minaj|Anaconda|2014
Cardi B|Bodak Yellow|2017
Doja Cat|Say So|2019
Doja Cat|Kiss Me More|2021
Doja Cat|Paint The Town Red|2023
Lizzo|Truth Hurts|2017
Lizzo|About Damn Time|2022
Billie Eilish|ocean eyes|2016
Billie Eilish|lovely|2018
Billie Eilish|when the party's over|2018
Billie Eilish|everything i wanted|2019
Billie Eilish|Happier Than Ever|2021
Billie Eilish|What Was I Made For?|2023
Billie Eilish|LUNCH|2024
Olivia Rodrigo|good 4 u|2021
Olivia Rodrigo|deja vu|2021
Olivia Rodrigo|vampire|2023
Taylor Swift|Love Story|2008
Taylor Swift|You Belong With Me|2008
Taylor Swift|We Are Never Ever Getting Back Together|2012
Taylor Swift|Style|2014
Taylor Swift|Bad Blood|2014
Taylor Swift|Look What You Made Me Do|2017
Taylor Swift|cardigan|2020
Taylor Swift|Fortnight|2024
Harry Styles|Sign of the Times|2017
Harry Styles|Adore You|2019
One Direction|What Makes You Beautiful|2011
One Direction|Story of My Life|2013
One Direction|Drag Me Down|2015
Little Mix|Shout Out to My Ex|2016
Zara Larsson|Lush Life|2015
Clean Bandit|Symphony|2017
Dua Lipa|IDGAF|2017
Dua Lipa|Physical|2020
Dua Lipa|Dance The Night|2023
Dua Lipa|Houdini|2023
The Weeknd|The Hills|2015
The Weeknd|Starboy|2016
The Weeknd|I Feel It Coming|2016
The Weeknd|Die For You|2016
The Weeknd|Save Your Tears|2020
Imagine Dragons|Demons|2012
Imagine Dragons|Thunder|2017
Imagine Dragons|Enemy|2021
Imagine Dragons|Bones|2022
Twenty One Pilots|Stressed Out|2015
Twenty One Pilots|Heathens|2016
Panic! At The Disco|High Hopes|2018
Fall Out Boy|Sugar, We're Goin Down|2005
Fall Out Boy|Centuries|2014
My Chemical Romance|Welcome to the Black Parade|2006
Paramore|Misery Business|2007
Paramore|Still into You|2013
Portugal. The Man|Feel It Still|2017
Foster The People|Pumped Up Kicks|2010
fun.|We Are Young|2011
WALK THE MOON|Shut Up and Dance|2014
MGMT|Electric Feel|2007
Empire of the Sun|Walking on a Dream|2008
Phoenix|Lisztomania|2009
Two Door Cinema Club|What You Know|2010
Tame Impala|The Less I Know the Better|2015
Lana Del Rey|Video Games|2011
Lana Del Rey|Summertime Sadness|2012
Lana Del Rey|Young and Beautiful|2013
Lorde|Green Light|2017
Sia|Unstoppable|2016
Rag'n'Bone Man|Human|2016
James Arthur|Say You Won't Let Go|2016
Lewis Capaldi|Before You Go|2019
Tom Odell|Another Love|2012
Måneskin|ZITTI E BUONI|2021
Måneskin|I WANNA BE YOUR SLAVE|2021
Jack Harlow|First Class|2022
Lil Nas X|MONTERO (Call Me By Your Name)|2021
Lil Nas X|INDUSTRY BABY|2021
24kGoldn|Mood|2020
SZA|Kill Bill|2022
Steve Lacy|Bad Habit|2022
Rema|Calm Down|2022
Tate McRae|greedy|2023
Tate McRae|Sports car|2025
Noah Kahan|Stick Season|2022
Hozier|Too Sweet|2024
Djo|End of Beginning|2022
Tommy Richman|MILLION DOLLAR BABY|2024
Shaboozey|A Bar Song (Tipsy)|2024
Gracie Abrams|That's So True|2024
Sabrina Carpenter|Feather|2023
Sabrina Carpenter|Please Please Please|2024
Sabrina Carpenter|Taste|2024
Chappell Roan|Pink Pony Club|2020
Chappell Roan|HOT TO GO!|2023
Charli xcx|360|2024
sombr|back to friends|2024
Benson Boone|Mystical Magical|2025
Ravyn Lenae|Love Me Not|2024
KATSEYE|Gabriela|2025
Mecano|Hawaii-Bombay|1983
Mecano|Aire|1986
Radio Futura|Enamorado de la moda juvenil|1980
Radio Futura|Veneno en la piel|1990
Alaska y Los Pegamoides|Bailando|1982
Alaska y Dinarama|Ni tú ni nadie|1984
Golpes Bajos|Malos tiempos para la lírica|1983
Hombres G|Sufre mamón|1985
Gabinete Caligari|Al calor del amor en un bar|1986
Héroes del Silencio|Héroe de leyenda|1987
Héroes del Silencio|Maldito duende|1990
Héroes del Silencio|La chispa adecuada|1995
Extremoduro|Ama, ama, ama y ensancha el alma|1996
Extremoduro|Standby|2008
Fito y Fitipaldis|Por la boca vive el pez|2006
Mägo de Oz|Fiesta pagana|2000
Joaquín Sabina|Y nos dieron las diez|1992
Joaquín Sabina|Contigo|1996
Manolo García|Pájaros de barro|1998
Alejandro Sanz|Cuando nadie me ve|2000
Alejandro Sanz|El alma al aire|2000
Alejandro Sanz|No es lo mismo|2003
Amaral|Días de verano|2005
La Oreja de Van Gogh|La playa|2000
La Oreja de Van Gogh|Muñeca de trapo|2006
Bebe|Malo|2004
David Bisbal|Dígale|2002
Juanes|A Dios le pido|2002
Juanes|Es por ti|2002
Juanes|Fotografía|2002
Maná|Rayando el sol|1990
Maná|Oye mi amor|1992
Maná|Clavado en un bar|1997
Maná|Labios compartidos|2006
Santana|Corazón Espinado|1999
Soda Stereo|Persiana americana|1986
Soda Stereo|De música ligera|1990
Los Prisioneros|Tren al sur|1990
Los Fabulosos Cadillacs|Matador|1993
Café Tacvba|Eres|2003
Julieta Venegas|Me voy|2006
Julieta Venegas|Limón y sal|2006
Luis Miguel|Ahora te puedes marchar|1987
Luis Miguel|La incondicional|1988
Thalía|Amor a la mexicana|1997
Selena|Bidi Bidi Bom Bom|1994
Marc Anthony|Valió la pena|2004
Romeo Santos|Propuesta indecente|2013
Aventura|Obsesión|2002
Prince Royce|Darte un beso|2013
Carlos Vives|La gota fría|1993
Carlos Vives|Volví a nacer|2012
Rosalía|Pienso en tu mirá|2018
Rosalía|Bizcochito|2022
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
Marisol|Tómbola|1962
Raphael|Mi gran noche|1967
Julio Iglesias|La vida sigue igual|1968
Miguel Ríos|Himno de la alegría|1969
Joan Manuel Serrat|Penélope|1969
Joan Manuel Serrat|Mediterráneo|1971
Joan Manuel Serrat|Lucía|1971
Karina|En un mundo nuevo|1971
Cecilia|Dama, dama|1972
Cecilia|Un ramito de violetas|1975
Nino Bravo|América, América|1973
Camilo Sesto|¿Quieres ser mi amante?|1974
Camilo Sesto|Melina|1975
Camilo Sesto|Perdóname|1980
Las Grecas|Te estoy amando locamente|1974
Sergio y Estíbaliz|Tú volverás|1975
Jarcha|Libertad sin ira|1976
Pablo Abraira|Gavilán o paloma|1977
Los Chunguitos|Dame veneno|1977
Burning|¿Qué hace una chica como tú en un sitio como este?|1978
Medina Azahara|Paseando por la Mezquita|1979
Miguel Bosé|Te amaré|1980
Julio Iglesias|Hey!|1980
Radio Futura|Enamorado de la moda juvenil|1980
Rocío Dúrcal|La gata bajo la lluvia|1981
Rocío Jurado|Como una ola|1981
Alaska y Los Pegamoides|Bailando|1982
José Luis Perales|¿Y cómo es él?|1982
Mocedades|Amor de hombre|1982
Michael Jackson|Thriller|1982
Golpes Bajos|Malos tiempos para la lírica|1983
Mecano|Hawaii-Bombay|1983
Righeira|Vamos a la playa|1983
Alaska y Dinarama|Ni tú ni nadie|1984
Juan Gabriel|Querida|1984
Madonna|Like a Virgin|1984
Isabel Pantoja|Marinero de luces|1985
Hombres G|Sufre mamón|1985
Hombres G|Venecia|1985
a-ha|Take On Me|1985
Gabinete Caligari|Al calor del amor en un bar|1986
Mecano|Me cuesta tanto olvidarte|1986
Alaska y Dinarama|A quién le importa|1986
Desireless|Voyage, voyage|1986
Soda Stereo|Persiana americana|1986
Héroes del Silencio|Héroe de leyenda|1987
Duncan Dhu|En algún lugar|1987
Luis Miguel|Ahora te puedes marchar|1987
Whitney Houston|I Wanna Dance with Somebody (Who Loves Me)|1987
Mecano|La fuerza del destino|1988
Luis Miguel|La incondicional|1988
Bobby McFerrin|Don't Worry, Be Happy|1988
Madonna|Like a Prayer|1989
Kaoma|Lambada|1989
Radio Futura|Veneno en la piel|1990
Héroes del Silencio|Maldito duende|1990
Maná|Rayando el sol|1990
Soda Stereo|De música ligera|1990
Roxette|It Must Have Been Love|1990
Madonna|Vogue|1990
Bryan Adams|(Everything I Do) I Do It for You|1991
Michael Jackson|Black or White|1991
Celtas Cortos|20 de abril|1991
Joaquín Sabina|Y nos dieron las diez|1992
Maná|Oye mi amor|1992
Whitney Houston|I Will Always Love You|1992
Ace of Base|All That She Wants|1992
Dr. Alban|It's My Life|1992
Los Rodríguez|Sin documentos|1993
Carlos Vives|La gota fría|1993
Gloria Estefan|Mi tierra|1993
Haddaway|What Is Love|1993
Corona|The Rhythm of the Night|1993
Whigfield|Saturday Night|1994
The Cranberries|Zombie|1994
Héroes del Silencio|La chispa adecuada|1995
Shakira|Estoy aquí|1995
Joaquín Sabina|Contigo|1996
Rosana|El talismán|1996
Gala|Freed from Desire|1996
Maná|Clavado en un bar|1997
Thalía|Amor a la mexicana|1997
Celine Dion|My Heart Will Go On|1997
Aqua|Barbie Girl|1997
Manolo García|Pájaros de barro|1998
Cher|Believe|1998
Eiffel 65|Blue (Da Ba Dee)|1998
Santana|Corazón Espinado|1999
Ricky Martin|Livin' la Vida Loca|1999
Lou Bega|Mambo No. 5 (A Little Bit of...)|1999
Enrique Iglesias|Bailamos|1999
Alejandro Sanz|Cuando nadie me ve|2000
Alejandro Sanz|El alma al aire|2000
La Oreja de Van Gogh|La playa|2000
Bon Jovi|It's My Life|2000
Kylie Minogue|Can't Get You Out of My Head|2001
Enrique Iglesias|Hero|2001
Juanes|Es por ti|2002
Juanes|Fotografía|2002
David Bisbal|Dígale|2002
Aventura|Obsesión|2002
Alejandro Sanz|No es lo mismo|2003
Black Eyed Peas|Where Is the Love?|2003
Beyoncé|Crazy in Love|2003
Café Tacvba|Eres|2003
Bebe|Malo|2004
Marc Anthony|Valió la pena|2004
Daddy Yankee|Gasolina|2004
Amaral|Días de verano|2005
Madonna|Hung Up|2005
Julieta Venegas|Me voy|2006
Julieta Venegas|Limón y sal|2006
Maná|Labios compartidos|2006
La Oreja de Van Gogh|Muñeca de trapo|2006
Fito y Fitipaldis|Por la boca vive el pez|2006
Coldplay|Viva la Vida|2008
Shakira|Loba|2009
Shakira|Waka Waka (This Time for Africa)|2010
Shakira|Loca|2010
Don Omar|Danza Kuduro|2010
Adele|Rolling in the Deep|2010
Adele|Someone Like You|2011
Gotye|Somebody That I Used to Know|2011
Michel Teló|Ai Se Eu Te Pego|2011
Carlos Vives|Volví a nacer|2012
PSY|Gangnam Style|2012
Romeo Santos|Propuesta indecente|2013
Prince Royce|Darte un beso|2013
Marc Anthony|Vivir Mi Vida|2013
Avicii|Wake Me Up|2013
Pharrell Williams|Happy|2013
Mark Ronson|Uptown Funk|2014
Nicky Jam|El Perdón|2015
Adele|Hello|2015
Justin Bieber|Sorry|2015
Shakira|Chantaje|2016
Ricky Martin|Vente Pa' Ca|2016
Shakira|Me Enamoré|2017
Enrique Iglesias|SUBEME LA RADIO|2017
Camila Cabello|Havana|2017
Dua Lipa|New Rules|2017
Álvaro Soler|La Cintura|2018
Rosalía|Pienso en tu mirá|2018
Lewis Capaldi|Someone You Loved|2018
Camilo|Tutu|2019
Rosalía|Con altura|2019
Billie Eilish|bad guy|2019
Tones And I|Dance Monkey|2019
Bad Bunny|Callaita|2019
Karol G|Tusa|2019
Ana Mena|A Un Paso De La Luna|2020
Bad Bunny|Dákiti|2020
Rauw Alejandro|Todo de Ti|2021
Ana Mena|Música Ligera|2021
Sebastián Yatra|Pareja Del Año|2021
Olivia Rodrigo|drivers license|2021
Måneskin|Beggin'|2017
Bad Bunny|Tití Me Preguntó|2022
Bad Bunny|Me Porto Bonito|2022
Karol G|PROVENZA|2022
Rosalía|Bizcochito|2022
Quevedo|Columbia|2023
Shakira|Acróstico|2023
Teddy Swims|Lose Control|2023
Benson Boone|Beautiful Things|2024
Bad Bunny|EoO|2025
Lady Gaga|Abracadabra|2025
HUNTR/X|Golden|2025
Alex Warren|Ordinary|2025
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
Righeira|Vamos a la playa|1983
Ryan Paris|Dolce Vita|1983
Laid Back|Sunshine Reggae|1983
Mecano|Hawaii-Bombay|1983
Baltimora|Tarzan Boy|1985
Desireless|Voyage, voyage|1986
Sabrina|Boys (Summertime Love)|1987
Spagna|Call Me|1987
Gloria Estefan|Rhythm Is Gonna Get You|1987
Juan Luis Guerra|Ojalá que llueva café|1989
Juan Luis Guerra|Visa para un sueño|1989
UB40|Kingston Town|1989
Black Box|Ride on Time|1989
Snap!|The Power|1990
C+C Music Factory|Gonna Make You Sweat (Everybody Dance Now)|1990
2 Unlimited|Get Ready for This|1991
Snap!|Rhythm Is a Dancer|1992
Dr. Alban|It's My Life|1992
Captain Hollywood Project|More and More|1992
Ace of Base|All That She Wants|1992
Snow|Informer|1992
Haddaway|What Is Love|1993
Haddaway|Life|1993
2 Unlimited|No Limit|1993
Culture Beat|Mr. Vain|1993
Ace of Base|The Sign|1993
Real McCoy|Another Night|1993
UB40|(I Can't Help) Falling in Love with You|1993
Carlos Vives|La gota fría|1993
Ini Kamoze|Here Comes the Hotstepper|1994
Scatman John|Scatman (ski-ba-bop-ba-dop-bop)|1994
Rednex|Cotton Eye Joe|1994
La Bouche|Be My Lover|1995
Ace of Base|Beautiful Life|1995
Robert Miles|Children|1995
Mr. President|Coco Jamboo|1996
Jarabe de Palo|La flaca|1996
Rosana|El talismán|1996
Spice Girls|Wannabe|1996
Aqua|Barbie Girl|1997
Aqua|Doctor Jones|1997
Will Smith|Gettin' Jiggy wit It|1997
Will Smith|Miami|1997
Jarabe de Palo|Depende|1998
Manu Chao|Bongo Bong|1998
Fatboy Slim|The Rockafeller Skank|1998
Stardust|Music Sounds Better with You|1998
ATB|9 PM (Till I Come)|1998
Eiffel 65|Move Your Body|1999
Darude|Sandstorm|1999
Jennifer Lopez|Let's Get Loud|1999
Enrique Iglesias|Bailamos|1999
Santana|Smooth|1999
Estopa|Como Camarón|1999
Ricky Martin|She Bangs|2000
Shaggy|It Wasn't Me|2000
Shaggy|Angel|2000
Daft Punk|One More Time|2000
Spiller|Groovejet (If This Ain't Love)|2000
La Oreja de Van Gogh|La playa|2000
Manu Chao|Me gustas tú|2001
Shakira|Whenever, Wherever|2001
Kylie Minogue|Can't Get You Out of My Head|2001
Aventura|Obsesión|2002
Melendi|Con la luna llena|2003
Black Eyed Peas|Where Is the Love?|2003
Beyoncé|Crazy in Love|2003
Black Eyed Peas|Let's Get It Started|2004
Bebe|Malo|2004
Marc Anthony|Valió la pena|2004
Black Eyed Peas|Pump It|2005
Amaral|Días de verano|2005
El Canto del Loco|Zapatillas|2005
Rihanna|Pon de Replay|2005
Rihanna|SOS|2006
Rihanna|Don't Stop the Music|2007
Timbaland|The Way I Are|2007
Black Eyed Peas|Boom Boom Pow|2009
David Guetta|Memories|2009
Flo Rida|Right Round|2009
Pitbull|Hotel Room Service|2009
Kesha|TiK ToK|2009
Katy Perry|California Gurls|2010
Katy Perry|Teenage Dream|2010
Katy Perry|Last Friday Night (T.G.I.F.)|2010
Rihanna|Only Girl (In the World)|2010
Black Eyed Peas|The Time (Dirty Bit)|2010
Martin Solveig|Hello|2010
Usher|DJ Got Us Fallin' in Love|2010
Don Omar|Dutty Love|2010
David Guetta|Without You|2011
Calvin Harris|Feel So Close|2011
Nicki Minaj|Super Bass|2011
Avicii|Levels|2011
Flo Rida|Whistle|2012
Nicki Minaj|Starships|2012
Swedish House Mafia|Don't You Worry Child|2012
Icona Pop|I Love It|2012
Carlos Vives|Volví a nacer|2012
Robin Thicke|Blurred Lines|2013
Martin Garrix|Animals|2013
Avicii|Hey Brother|2013
DJ Snake|Turn Down for What|2013
Romeo Santos|Propuesta indecente|2013
Prince Royce|Darte un beso|2013
Avicii|The Nights|2014
Mark Ronson|Uptown Funk|2014
David Guetta|Hey Mama|2014
Shakira|Can't Remember to Forget You|2014
Calvin Harris|Blame|2014
Calvin Harris|How Deep Is Your Love|2015
Jason Derulo|Want to Want Me|2015
Justin Bieber|What Do You Mean?|2015
Justin Bieber|Sorry|2015
Nicky Jam|Hasta el Amanecer|2016
Zion & Lennox|Otra Vez|2016
CNCO|Reggaetón Lento (Bailemos)|2016
Maluma|Cuatro Babys|2016
DJ Snake|Let Me Love You|2016
Rihanna|Work|2016
Jason Derulo|Swalla|2017
Shakira|Me Enamoré|2017
Maluma|Felices los 4|2017
Natti Natasha|Criminal|2017
Dua Lipa|New Rules|2017
Ed Sheeran|Galway Girl|2017
Álvaro Soler|La Cintura|2018
Nicky Jam|X|2018
Becky G|Sin Pijama|2018
Cardi B|I Like It|2018
Daddy Yankee|Dura|2018
Ozuna|Baila Baila Baila|2019
Sech|Otro Trago|2019
Karol G|Tusa|2019
Doja Cat|Say So|2019
Bad Bunny|Dákiti|2020
Bad Bunny|Safaera|2020
Maluma|Hawái|2020
Myke Towers|Bandido|2020
Ozuna|Caramelo|2020
J Balvin|Rojo|2020
The Weeknd|Blinding Lights|2019
The Weeknd|Save Your Tears|2020
Dua Lipa|Physical|2020
24kGoldn|Mood|2020
Farruko|Pepas|2021
Rauw Alejandro|Desesperados|2021
Anitta|Envolver|2021
Doja Cat|Kiss Me More|2021
Justin Bieber|Peaches|2021
The Kid LAROI|STAY|2021
Ed Sheeran|Bad Habits|2021
Lil Nas X|MONTERO (Call Me By Your Name)|2021
Bad Bunny|Ojitos Lindos|2022
Bad Bunny|Efecto|2022
Becky G|MAMIII|2022
Feid|Normal|2022
Quevedo|Playa Del Inglés|2022
Harry Styles|As It Was|2022
Glass Animals|Heat Waves|2020
Lizzo|About Damn Time|2022
Rema|Calm Down|2022
David Guetta|I'm Good (Blue)|2022
Bad Bunny|Monaco|2023
Bad Bunny|WHERE SHE GOES|2023
Bizarrap|Shakira: Bzrp Music Sessions, Vol. 53|2023
Dua Lipa|Dance The Night|2023
Dua Lipa|Houdini|2023
Shakira|Soltera|2024
Sabrina Carpenter|Please Please Please|2024
Sabrina Carpenter|Taste|2024
Shaboozey|A Bar Song (Tipsy)|2024
Tommy Richman|MILLION DOLLAR BABY|2024
Chappell Roan|HOT TO GO!|2023
Charli xcx|360|2024
ROSÉ|APT.|2024
Benson Boone|Beautiful Things|2024
Bad Bunny|NUEVAYoL|2025
Bad Bunny|VOY A LLeVARTE PA PR|2025
Lady Gaga|Abracadabra|2025
Tate McRae|Sports car|2025
HUNTR/X|Golden|2025
Benson Boone|Mystical Magical|2025
Ravyn Lenae|Love Me Not|2024
KATSEYE|Gabriela|2025
Justin Bieber|DAISIES|2025
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
Don Omar|Dale Don Dale|2003
Daddy Yankee|No Me Dejes Solo|2004
Daddy Yankee|Tu Príncipe|2004
Daddy Yankee|Corazones|2004
Daddy Yankee|Dale Caliente|2004
Ivy Queen|Te He Querido, Te He Llorado|2004
Don Omar|Reggaetón Latino|2005
Daddy Yankee|Machucando|2005
Wisin & Yandel|Noche de Sexo|2005
Wisin & Yandel|Llamé Pa' Verte|2006
Don Omar|Angelito|2006
Don Omar|Conteo|2006
Daddy Yankee|Impacto|2007
Zion|Zun Da Da|2007
Daddy Yankee|Descontrol|2010
Daddy Yankee|Grito Mundial|2010
Don Omar|Hasta Abajo|2010
Don Omar|Dutty Love|2010
Don Omar|Taboo|2011
Wisin & Yandel|Follow the Leader|2012
J Balvin|Tranquila|2013
Yandel|Hablé de Ti|2013
Plan B|Fanática Sensual|2014
Plan B|Si No Le Contesto|2014
Wisin|Adrenalina|2014
Enrique Iglesias|Bailando|2014
Gente de Zona|La Gozadera|2015
Daddy Yankee|Sígueme y Te Sigo|2015
Wisin|Vacaciones|2016
Arcángel|Pa' Que la Pases Bien|2016
Nicky Jam|El Amante|2017
Ozuna|Síguelo Bailando|2017
Ozuna|Tu Foto|2017
Ozuna|La Modelo|2017
Bad Bunny|Chambea|2017
Anitta|Downtown|2017
Daddy Yankee|La Rompe Corazones|2017
Bad Bunny|Amorfoda|2018
Bad Bunny|Solo de Mí|2018
Bad Bunny|La Romana|2018
Bad Bunny|Otra Noche en Miami|2018
Bad Bunny|Caro|2018
Ozuna|Vaina Loca|2018
Ozuna|Única|2018
J Balvin|Reggaeton|2018
Maluma|El Préstamo|2018
Maluma|Mala Mía|2018
Karol G|Pineapple|2018
Karol G|Créeme|2018
Karol G|Culpables|2018
Anuel AA|Ella Quiere Beber - Remix|2018
Pedro Capó|Calma - Remix|2018
Reik|Me Niego|2018
Aitana|Lo malo|2018
Ana Guerra|Ni la hora|2018
Lola Indigo|Ya no quiero ná|2018
J Balvin|QUE PRETENDES|2019
Karol G|Ocean|2019
Myke Towers|Si Se Da|2019
Sech|Sal y Perrea|2019
Jhay Cortez|No Me Conoce - Remix|2019
DJ Snake|Loco Contigo|2019
Dalex|Pa Mí - Remix|2019
Daddy Yankee|Que Tire Pa 'Lante|2019
Bad Bunny|Ignorantes|2020
Bad Bunny|Bichiyal|2020
Bad Bunny|Te Mudaste|2020
Bad Bunny|Pero Ya No|2020
Bad Bunny|La Difícil|2020
Bad Bunny|25/8|2020
Bad Bunny|La Santa|2020
J Balvin|Amarillo|2020
J Balvin|Azul|2020
Karol G|Ay, Dios Mío!|2020
Rauw Alejandro|Tattoo|2020
Myke Towers|Diosa|2020
Feid|Porfa|2020
Anuel AA|Hasta Que Dios Diga|2020
J Balvin|In Da Getto|2021
Karol G|200 Copas|2021
Omar Montes|Alocao|2021
Ana Mena|Música Ligera|2021
Bad Bunny|Party|2022
Bad Bunny|Después de la Playa|2022
Bad Bunny|El Apagón|2022
Bad Bunny|Neverita|2022
Bad Bunny|Un Coco|2022
Bad Bunny|Tarot|2022
Karol G|GATÚBELA|2022
Rauw Alejandro|LOKERA|2022
Rauw Alejandro|Punto 40|2022
Feid|FERXXO 100|2022
Arcángel|La Jumpa|2022
Quevedo|Punto G|2022
La Pantera|Cayó La Noche|2022
Yandel|Yandel 150|2022
Shakira|Te Felicito|2022
Rosalía|Despechá|2022
zzoilo|Mon Amour - Remix|2022
Bad Bunny|PERRO NEGRO|2023
Bad Bunny|UN PREVIEW|2023
Bad Bunny|FINA|2023
Karol G|MI EX TENÍA RAZÓN|2023
Karol G|QLONA|2023
Karol G|Mientras Me Curo Del Cora|2023
Rauw Alejandro|BABY HELLO|2023
Feid|LUNA|2023
El Alfa|La Mamá de la Mamá|2023
Lola Indigo|La Niña de la Escuela|2023
Emilia|La_Original.mp3|2023
Karol G|SEJODIOTO|2024
Shakira|Soltera|2024
Shakira|Puntería|2024
Bad Bunny|KETU TeCRÉ|2025
Bad Bunny|VeLDÁ|2025
Bad Bunny|KLOuFRENS|2025
Bad Bunny|EL CLúB|2025
Bad Bunny|Yo Visto Así|2020
Bad Bunny|Soliá|2020
Bad Bunny|Hablamos Mañana|2020
Bad Bunny|Bye Me Fui|2020
Bad Bunny|La Corriente|2022
Bad Bunny|Aguacero|2022
Bad Bunny|Enséñame a Bailar|2022
Bad Bunny|Me Fui de Vacaciones|2022
Bad Bunny|Un Ratito|2022
Karol G|CAIRO|2022
Karol G|AMARGURA|2023
`;

const TEEN = `
New Kids On The Block|You Got It (The Right Stuff)|1988
New Kids On The Block|Hangin' Tough|1988
New Kids On The Block|Step by Step|1990
Menudo|Súbete a mi moto|1981
Locomía|Locomía|1989
Take That|Pray|1993
Take That|Relight My Fire|1993
Take That|Back for Good|1995
Take That|Patience|2006
Take That|Shine|2007
Take That|Rule the World|2007
Boyzone|Love Me for a Reason|1994
Boyzone|Words|1996
Boyzone|No Matter What|1998
Backstreet Boys|I'll Never Break Your Heart|1995
Backstreet Boys|Quit Playing Games (With My Heart)|1996
Backstreet Boys|Everybody (Backstreet's Back)|1997
Backstreet Boys|As Long as You Love Me|1997
Backstreet Boys|I Want It That Way|1999
Backstreet Boys|Larger than Life|1999
Backstreet Boys|Show Me the Meaning of Being Lonely|1999
Backstreet Boys|The One|1999
Backstreet Boys|Shape of My Heart|2000
Backstreet Boys|Incomplete|2005
*NSYNC|I Want You Back|1996
*NSYNC|Tearin' Up My Heart|1997
*NSYNC|Bye Bye Bye|2000
*NSYNC|It's Gonna Be Me|2000
*NSYNC|Pop|2001
*NSYNC|Girlfriend|2001
Hanson|MMMBop|1997
Five|Everybody Get Up|1998
Five|Keep On Movin'|1999
Westlife|Swear It Again|1999
Westlife|Flying Without Wings|1999
Westlife|World of Our Own|2001
Westlife|Uptown Girl|2001
Westlife|You Raise Me Up|2005
Blue|All Rise|2001
Blue|One Love|2002
Busted|What I Go to School For|2002
Busted|Year 3000|2003
McFly|Obviously|2004
McFly|Five Colours in Her Hair|2004
McFly|All About You|2005
Jonas Brothers|S.O.S|2007
Jonas Brothers|When You Look Me in the Eyes|2007
Jonas Brothers|Burnin' Up|2008
Jonas Brothers|Lovebug|2008
Jonas Brothers|Play My Music|2008
Jonas Brothers|Sucker|2019
Jonas Brothers|Only Human|2019
Big Time Rush|Boyfriend|2010
The Wanted|All Time Low|2010
The Wanted|Glad You Came|2011
One Direction|What Makes You Beautiful|2011
One Direction|One Thing|2011
One Direction|Live While We're Young|2012
One Direction|Little Things|2012
One Direction|Kiss You|2012
One Direction|Best Song Ever|2013
One Direction|Story of My Life|2013
One Direction|Steal My Girl|2014
One Direction|Night Changes|2014
One Direction|Drag Me Down|2015
One Direction|Perfect|2015
5 Seconds of Summer|She Looks So Perfect|2014
5 Seconds of Summer|Amnesia|2014
5 Seconds of Summer|Youngblood|2018
Dvicio|Paraíso|2014
CNCO|Reggaetón Lento (Bailemos)|2016
CNCO|Hey DJ|2017
BTS|DNA|2017
BTS|Boy With Luv|2019
BTS|Dynamite|2020
BTS|Butter|2021
BTS|Permission to Dance|2021
Jung Kook|Seven|2023
BLACKPINK|DDU-DU DDU-DU|2018
BLACKPINK|Kill This Love|2019
BLACKPINK|How You Like That|2020
BLACKPINK|Pink Venom|2022
NewJeans|OMG|2023
NewJeans|Super Shy|2023
ROSÉ|APT.|2024
HUNTR/X|Golden|2025
Saja Boys|Soda Pop|2025
KATSEYE|Gabriela|2025
Spice Girls|Wannabe|1996
Spice Girls|Say You'll Be There|1996
Spice Girls|2 Become 1|1996
Spice Girls|Spice Up Your Life|1997
Spice Girls|Stop|1997
Spice Girls|Too Much|1997
Spice Girls|Viva Forever|1997
All Saints|Never Ever|1997
All Saints|Pure Shores|2000
Steps|5,6,7,8|1997
Steps|Tragedy|1998
B*Witched|C'est la vie|1998
S Club 7|Reach|2000
S Club 7|Don't Stop Movin'|2001
Atomic Kitten|Whole Again|2001
Atomic Kitten|The Tide Is High (Get the Feeling)|2002
Sugababes|Push the Button|2005
Sugababes|About You Now|2007
Girls Aloud|Something Kinda Ooooh|2006
Girls Aloud|The Promise|2008
TLC|No Scrubs|1999
Destiny's Child|Say My Name|1999
Destiny's Child|Survivor|2001
Destiny's Child|Bootylicious|2001
The Cheetah Girls|Cheetah Sisters|2003
The Cheetah Girls|The Party's Just Begun|2006
The Pussycat Dolls|Don't Cha|2005
The Pussycat Dolls|Buttons|2006
Little Mix|Wings|2012
Little Mix|Black Magic|2015
Little Mix|Shout Out to My Ex|2016
Little Mix|Touch|2016
Fifth Harmony|Worth It|2015
Fifth Harmony|Work from Home|2016
RBD|Rebelde|2004
RBD|Sólo Quédate En Silencio|2004
RBD|Sálvame|2004
RBD|Nuestro Amor|2005
RBD|Tras De Mí|2005
Britney Spears|...Baby One More Time|1998
Britney Spears|(You Drive Me) Crazy|1999
Britney Spears|Sometimes|1999
Britney Spears|Oops!...I Did It Again|2000
Britney Spears|Lucky|2000
Britney Spears|Stronger|2000
Britney Spears|Toxic|2003
Christina Aguilera|Genie in a Bottle|1999
Christina Aguilera|What a Girl Wants|1999
Christina Aguilera|Come On Over Baby (All I Want Is You)|2000
Mandy Moore|Candy|1999
Aaron Carter|I Want Candy|2000
Aaron Carter|Aaron's Party (Come Get It)|2000
Hilary Duff|Why Not|2002
Hilary Duff|So Yesterday|2003
Hilary Duff|Come Clean|2003
Hilary Duff|What Dreams Are Made Of|2003
Hilary Duff|Wake Up|2005
Avril Lavigne|Complicated|2002
Avril Lavigne|Sk8er Boi|2002
Avril Lavigne|I'm with You|2002
Avril Lavigne|Girlfriend|2007
Simple Plan|Perfect|2002
Simple Plan|Welcome to My Life|2004
Good Charlotte|The Anthem|2002
Kelly Clarkson|Miss Independent|2003
Kelly Clarkson|Since U Been Gone|2004
Ashlee Simpson|Pieces of Me|2004
Jesse McCartney|Beautiful Soul|2004
Jesse McCartney|Leavin'|2008
The Click Five|Just the Girl|2005
Plain White T's|Hey There Delilah|2006
Paramore|Misery Business|2007
Aly & AJ|Potential Breakup Song|2007
Vanessa Hudgens|Say OK|2006
Ashley Tisdale|He Said She Said|2007
Owl City|Fireflies|2009
Kesha|TiK ToK|2009
Justin Bieber|One Time|2009
Justin Bieber|Baby|2010
Justin Bieber|Never Say Never|2010
Justin Bieber|Boyfriend|2012
Justin Bieber|Beauty And A Beat|2012
Justin Bieber|What Do You Mean?|2015
Justin Bieber|Sorry|2015
Justin Bieber|Love Yourself|2015
Katy Perry|Teenage Dream|2010
Katy Perry|Last Friday Night (T.G.I.F.)|2010
Katy Perry|Firework|2010
Katy Perry|Roar|2013
Carly Rae Jepsen|Call Me Maybe|2011
Taylor Swift|Love Story|2008
Taylor Swift|You Belong With Me|2008
Taylor Swift|22|2012
Taylor Swift|Shake It Off|2014
Ariana Grande|The Way|2013
Ariana Grande|Problem|2014
Ariana Grande|Break Free|2014
Ariana Grande|thank u, next|2018
Meghan Trainor|All About That Bass|2014
Shawn Mendes|Stitches|2015
Shawn Mendes|Treat You Better|2016
Aitana|Teléfono|2018
Lola Indigo|Ya no quiero ná|2018
Conan Gray|Heather|2020
Olivia Rodrigo|All I Want|2019
Olivia Rodrigo|drivers license|2021
Olivia Rodrigo|deja vu|2021
Olivia Rodrigo|good 4 u|2021
Olivia Rodrigo|vampire|2023
Tate McRae|greedy|2023
Sabrina Carpenter|Espresso|2024
Miley Cyrus|The Best of Both Worlds|2006
Miley Cyrus|Nobody's Perfect|2007
Miley Cyrus|See You Again|2007
Miley Cyrus|7 Things|2008
Miley Cyrus|The Climb|2009
Miley Cyrus|Party In The U.S.A.|2009
Miley Cyrus|Hoedown Throwdown|2009
Miley Cyrus|He Could Be The One|2009
Miley Cyrus|We Can't Stop|2013
Miley Cyrus|Wrecking Ball|2013
Miley Cyrus|Flowers|2023
Selena Gomez & The Scene|Naturally|2009
Selena Gomez & The Scene|Who Says|2011
Selena Gomez & The Scene|Love You Like a Love Song|2011
Selena Gomez|Come & Get It|2013
Selena Gomez|Good for You|2015
Selena Gomez|Lose You To Love Me|2019
Demi Lovato|This Is Me|2008
Demi Lovato|La La Land|2008
Demi Lovato|Here We Go Again|2009
Demi Lovato|Skyscraper|2011
Demi Lovato|Heart Attack|2013
Demi Lovato|Let It Go|2013
Demi Lovato|Cool for the Summer|2015
Demi Lovato|Sorry Not Sorry|2017
Cast of Camp Rock|We Rock|2008
Zac Efron|Start of Something New|2006
Zac Efron|Get'cha Head in the Game|2006
Zac Efron|Breaking Free|2006
High School Musical Cast|We're All in This Together|2006
Ashley Tisdale|Bop to the Top|2006
High School Musical Cast|What Time Is It|2007
Zac Efron|Bet On It|2007
High School Musical Cast|High School Musical|2008
Zendaya|Replay|2013
Dove Cameron|Rotten to the Core|2015
Dove Cameron|Ways to Be Wicked|2017
Dove Cameron|Boyfriend|2022
Martina Stoessel|En Mi Mundo|2012
Ilene Woods|A Dream Is a Wish Your Heart Makes|1950
Verna Felton|Bibbidi-Bobbidi-Boo|1950
Mary Costa|Once Upon a Dream|1959
Julie Andrews|A Spoonful of Sugar|1964
Julie Andrews|Supercalifragilisticexpialidocious|1964
Dick Van Dyke|Chim Chim Cher-ee|1964
Phil Harris|The Bare Necessities|1967
Louis Prima|I Wan'na Be Like You|1967
Jodi Benson|Part of Your World|1989
Samuel E. Wright|Under the Sea|1989
Paige O'Hara|Belle|1991
Jerry Orbach|Be Our Guest|1991
Celine Dion|Beauty and the Beast|1991
Robin Williams|Friend Like Me|1992
Brad Kane|A Whole New World|1992
Elton John|Circle of Life|1994
Elton John|Can You Feel the Love Tonight|1994
Nathan Lane|Hakuna Matata|1994
Jeremy Irons|Be Prepared|1994
Judy Kuhn|Colors of the Wind|1995
Randy Newman|You've Got a Friend in Me|1995
Lillias White|Zero to Hero|1997
Roger Bart|Go the Distance|1997
Lea Salonga|Reflection|1998
Christina Aguilera|Reflection|1998
Donny Osmond|I'll Make a Man Out of You|1998
Phil Collins|You'll Be in My Heart|1999
Phil Collins|Two Worlds|1999
Anika Noni Rose|Almost There|2009
Mandy Moore|When Will My Life Begin|2010
Mandy Moore|I See the Light|2010
Owl City|When Can I See You Again?|2012
Idina Menzel|Let It Go|2013
Kristen Bell|Do You Want to Build a Snowman?|2013
Kristen Bell|For the First Time in Forever|2013
Josh Gad|In Summer|2013
Lana Del Rey|Once Upon a Dream|2014
Shakira|Try Everything|2016
Auli'i Cravalho|How Far I'll Go|2016
Dwayne Johnson|You're Welcome|2016
Anthony Gonzalez|Un Poco Loco|2017
Miguel|Remember Me (Dúo)|2017
Idina Menzel|Into the Unknown|2019
Kristen Bell|The Next Right Thing|2019
Jonathan Groff|Lost in the Woods|2019
Carolina Gaitán - La Gaita|We Don't Talk About Bruno|2021
Jessica Darrow|Surface Pressure|2021
Sebastián Yatra|Dos Oruguitas|2021
Ariana DeBose|This Wish|2023
Auli'i Cravalho|Beyond|2024
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
  teen: { name: 'Teen time', songs: parse(TEEN, 'teen') },
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
