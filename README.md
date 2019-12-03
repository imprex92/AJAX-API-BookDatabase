# AJAX-API-BookDatabase
Laboration 9: AJAX

Laboration 9: AJAX
Uppgiften ska göras ensam eller på två personer. Om man är två personer ska ska man utöver de vanliga kraven lämna in en individuell rapport.

Du ska skapa en webbsida där en besökare kan ha en katalog med böcker. Den ska lämnas in genom ett slackmeddelande till läraren. Uppgifter som redovisas för läraren under lektionstid kommer att bedömas före sådana som bara lämnas in.
Inlämning
Exempel på inlämning:
>>> Här är min inlämning. Jag satsar på VG.
https://<länk till mitt repo på GitHub>
https://<länk till webbsidan på GitHub pages>
API
Du ska använda ett API, med dokumentation på https://www.forverkliga.se/JavaScript/api/crud.php
Sidan är en del av specifikationen för laborationen och innehåller viktig information.

Beroende på om det är G/VG-nivå, ska man kunna lägga till en ny bok till listan, se vilka böcker som finns i listan, samt ändra eller ta bort en befintlig. Observera att API:et inte är helt tillförlitligt. Det returnerar alltid en sträng i JSON-format, men du måste kontrollera om det returnerar rätt svar eller om du får ett felmeddelande. 
Kodgranskning
Du ska gå igenom en klasskamrats kod och ge kamraten feedback. Detta ska ingå:
3 saker som är bra
1 sak som kan göras bättre

Dina anteckningar från kodgranskningen ska ligga i en textfil i ditt repository på github. Kvalitet är viktigare än kvantitet.


Du har hittat en ledtråd. Bra jobbat! Det kan löna sig att läsa resten av dokumentet lika noga!

Bedömning
För godkänt ska du:

Göra en webbsida som
är publicerad online (exempelvis med GitHub pages)
kan begära en API-nyckel
kan lägga till en bok
kan se vilka böcker som man har lagt in
har ett funktionellt gränssnitt
använder CSS för att styla sidan
försöker igen om ett API-anrop misslyckas, upp till 5 gånger
visar om det senaste anropet till API:et lyckades eller misslyckades, på webbsidan
inte genererar några JavaScript-fel i konsolen när man använder den

Dessutom ska du
göra en granskning av annan grupps kod
lämna in individuell rapport (om ni är två på uppgiften)


För väl godkänt ska du:

Göra en webbsida som
uppfyller kraven för godkänt
kan ändra och ta bort en bok
har ett lättanvänt och välarbetat gränssnitt
är responsiv, dvs fungerar även på mindre skärmar
dolt id - användaren behöver aldrig se böckernas id-egenskap
visar hur många gånger det senaste anropet till API:et har misslyckats, samt alla felmeddelanden som har kommit, på webbsidan.


Om ni är två om uppgiften så ska båda personerna lämna in varsin kort individuell rapport. Den ska vara antingen en textfil, ett delat dokument eller PDF; som du skickar via slack. Rapporten ska innehålla:
en redogörelse för hur ni har fördelat arbetet
kort sammanfattat, vad du har arbetat med
vad du tyckte var bäst med samarbetet
om det fanns något som kunde ha gjorts bättre.



Tips
Ett sätt att låta användaren ändra uppgifter smidigt är att ha texten i ett span-element och byta ut det mot ett input-element när man klickar på texten. Anropa sedan API:et när användaren skrivit klart och input-elementets change-händelse inträffar.

Det är en fördel för användaren om man kan skriva in en API-nyckel och på så sätt återanvända sin katalog. (En bättre, men svårare lösning, är att använda localStorage för att spara tidigare API-nycklar.)

Tänk på att API:et kan behöva flera försök för att lyckas. Hur hanterar man bäst ett felmeddelande från API:et? Hur kan man visa det i gränssnittet?

Skjut inte upp kodgranskningen till det sista du gör. Du kan lära dig mycket av den. Försök att få någon att granska din kod också.

Läs bedömningskriterierna flera gånger, så du inte missar några viktiga detaljer.




Lycka till!


. PS: Det finns ett hemligt tips någonstans i dokumentationen för laborationen, som du får använda om du hittar det. Du får berätta för dina klasskamrater att det finns en hemlighet, men inte hur man hittar den eller hur man gör!

_
