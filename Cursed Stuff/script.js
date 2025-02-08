const thickOfItLyrics = "I'm in the thick of it, everybody knows<br/>They know me where it snows, I skied in and they froze<br/>I don't know no nothin' 'bout no ice, I'm just cold<br/>Fourty somethin' milli' subs or so, I've been told<br/>I'm in my prime and this ain't even final form<br/>They knocked me down, but still, my feet, they find the floor<br/>I went from living rooms straight out to sold-out tours<br/>Life's a fight, but trust, I'm ready for the war<br/>Woah-oh-oh<br/>This is how the story goes<br/>Woah-oh-oh<br/>I guess this is how the story goes<br/>I'm in the thick of it, everybody knows<br/>They know me where it snows, I skied in and they froze<br/>I don't know no nothin' 'bout no ice, I'm just cold<br/>Fourty somethin' milli' subs or so, I've been told<br/>From the screen to the ring, to the pen, to the king<br/>Where's my crown? That's my bling<br/>Always drama when I ring<br/>See, I believe that if I see it in my heart<br/>Smash through the ceiling 'cause I'm reachin' for the stars<br/>Woah-oh-oh<br/>This is how the story goes<br/>Woah-oh-oh<br/>I guess this is how the story goes<br/>I'm in the thick of it, everybody knows<br/>They know me where it snows, I skied in and they froze (woo)<br/>I don't know no nothin' 'bout no ice, I'm just cold<br/>Fourty somethin' milli' subs or so, I've been told<br/>Highway to heaven, I'm just cruisin' by my lone'<br/>They cast me out, left me for dead, them people cold<br/>My faith in God, mind in the sun, I'm 'bout to sow (yeah)<br/>My life is hard, I took the wheel, I cracked the code (yeah-yeah, woah-oh-oh)<br/>Ain't nobody gon' save you, man, this life will break you (yeah, woah-oh-oh)<br/>In the thick of it, this is how the story goes<br/>I'm in the thick of it, everybody knows<br/>They know me where it snows, I skied in and they froze<br/>I don't know no nothin' 'bout no ice, I'm just cold<br/>Fourty somethin' milli' subs or so, I've been told<br/>I'm in the thick of it, everybody knows (everybody knows)<br/>They know me where it snows, I skied in and they froze (yeah)<br/>I don't know no nothin' 'bout no ice, I'm just cold<br/>Fourty somethin' milli' subs or so, I've been told (ooh-ooh)<br/>Woah-oh-oh (nah-nah-nah-nah, ayy, ayy)<br/>This is how the story goes (nah, nah)<br/>Woah-oh-oh<br/>I guess this is how the story goes";
const thickOfItAudio = '<source src="Thick Of It/mp3.mp3" type="audio/mpeg"/><source src="Thick Of It/aac.aac" type="audio/aac"/><source src="Thick Of It/aiff.aiff" type="audio/aiff"/><source src="Thick Of It/flac.flac" type="audio/flac"/><source src="Thick Of It/m4a.m4a" type="audio/m4a"/><source src="Thick Of It/wav.wav" type="audio/wav"/><source src="Thick Of It/wma.wma" type="audio/x-ms-wma"/>Your browser doesn\'t support these audio types.';
const thickOfItLive = `<live>${thickOfItLyrics}</live>`;
const byeByeByeLyrics = "Hey, hey<br>Bye bye bye, bye bye<br>Bye bye<br>I'm doing this tonight<br>You're probably gonna start a fight<br>I know this can't be right<br>Hey baby come on<br>I loved you endlessly<br>When you weren't there for me<br>So now it's time to leave and make it alone<br>I know that I can't take no more<br>It ain't no lie<br>I want to see you out that door<br>Baby bye bye bye<br>Don't want to be a fool for you<br>Just another player in your game for two<br>You may hate me but it ain't no lie<br>Baby bye bye bye<br>Bye bye<br>Don't really want to make it tough<br>I just want to tell you that I've had enough<br>It might sound crazy but it ain't no lie<br>Baby bye bye bye<br>You just hit me with the truth<br>Now girl you're more than welcome to<br>So give me one good reason<br>Baby come on<br>I've lived for you and me<br>And now I really come to see<br>That life would be much better once you're gone<br>I know that I can't take no more<br>It ain't no lie<br>I want to see you out that door<br>Baby bye bye bye<br>Don't want to be a fool for you<br>Just another player in your game for two<br>You may hate me but it ain't no lie<br>Baby bye bye bye<br>Bye bye<br>Don't really want to make it tough<br>I just want to tell you that I've had enough<br>Might sound crazy but it ain't no lie<br>Baby bye bye bye<br>I'm giving up I know for sure<br>I don't' want to be the reason for your love no more<br>Bye bye<br>I'm checking out, I'm signing off<br>I don't want to be the loser, and I've had enough<br>I don't want to be your fool in this game for two<br>So I'm leaving you behind<br>(Bye bye bye)<br>I don't want to make it tough<br>(Make it tough)<br>But I've had enough<br>And it ain't no lie<br>Don't want to be a fool for you<br>Just another player in your game for two<br>I don't want to be your fool<br>But it ain't no lie<br>Baby bye bye bye<br>Bye bye<br>Don't really want to make it tough<br>I just want to tell you that I've had enough<br>It might sound crazy but it ain't no lie<br>Bye bye<br>"
const byeByeByeAudio = '<source src="Bye Bye Bye/mp3.mp3" type="audio/mpeg"/><source src="Bye Bye Bye/aac.aac" type="audio/aac"/><source src="Bye Bye Bye/aiff.aiff" type="audio/aiff"/><source src="Bye Bye Bye/flac.flac" type="audio/flac"/><source src="Bye Bye Bye/m4a.m4a" type="audio/m4a"/><source src="Bye Bye Bye/wav.wav" type="audio/wav"/><source src="Bye Bye Bye/wma.wma" type="audio/x-ms-wma"/>Your browser doesn\'t support these audio types.';
const byeByeByeLive = `<live>${byeByeByeLyrics}</live>`
let goblinLength = Math.random();
// Select text elements within <ksi>
let KSIText = document.querySelectorAll("ksi > p, ksi > span, ksi > h1, ksi > h2, ksi > h3, ksi > h4, ksi > h5, ksi > h6, ksi > div");
// Select audio elements within <ksi>
let KSIAudio = document.querySelectorAll("ksi > audio");
let KSILive = document.querySelectorAll("ksi > live");
// Select text elements within <nsync>
let NSYNCText = document.querySelectorAll("nsync > p, nsync > span, nsync > h1, nsync > h2, nsync > h3, nsync > h4, nsync > h5, nsync > h6, nsync > div");
// Select audio elements within <nsync>
let NSYNCAudio = document.querySelectorAll("nsync > audio");
let NSYNCLive = document.querySelectorAll("nsync > live");

function ksiTakeover() {
    // Replace inner HTML of text elements with thickOfItLyrics
    KSIText.forEach(element => {
        element.innerHTML = thickOfItLyrics;
    });
    KSILive.forEach(element => {element.innerHTML = thickOfItLive});

    // Replace inner HTML of audio elements and reinitialise them with necessary attributes
    KSIAudio.forEach(element => {
        element.innerHTML = thickOfItAudio;
        element.load(); // Reinitialise the audio element to ensure it plays the new sources
    });
}
function nsyncTakeover() {
    // Replace inner HTML of text elements with thickOfItLyrics
    NSYNCText.forEach(element => {element.innerHTML = byeByeByeLyrics;});
    NSYNCLive.forEach(element => {element.innerHTML = byeByeByeLive;});

    // Replace inner HTML of audio elements and reinitialise them with necessary attributes
    NSYNCAudio.forEach(element => {
        element.innerHTML = byeByeByeAudio;
        element.load(); // Reinitialise the audio element to ensure it plays the new sources
    });
}
function liveTypingEffect() {
    document.querySelectorAll('live').forEach(el => {
        let text = el.innerHTML;
        let style = el.style.fontFamily;
        el.innerHTML = '';
        el.style.fontFamily = "'Consolas', monospace";
        let i = 0;

        const interval = setInterval(() => {
            if (text.slice(i, i + 4) === '<br>') {
                el.innerHTML += '<br>';
                i += 4;
            } else if (text.slice(i, i + 5) === "<br/>"){
                el.innerHTML += "<br/>";
                i += 5;
            } else {
                el.innerHTML += text.charAt(i);
                i++;
            }

            // Once typing is complete, convert to full HTML
            if (i >= text.length) {
                clearInterval(interval);
                el.innerHTML = text; // Convert to HTML after typing is complete
                el.style.fontFamily = style;
            }
        }, 20);
    });
}
function spinText(){
    document.querySelectorAll('spintext').forEach(el => {
        let text = el.innerText;
        el.innerHTML = '';
        text.split('').forEach(char => {
            let span = document.createElement('span');
            span.innerText = char;
            el.appendChild(span);
        });
    });
    
}
function randomise(){
    setInterval(() => {
        document.querySelectorAll('randomise').forEach(el => {
            let text = el.innerHTML.split('');
            for (let i = text.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [text[i], text[j]] = [text[j], text[i]];
            }
            el.innerHTML = text.join('');
        });
    }, 1000);
    
}
function paradox(){
    document.querySelectorAll('paradox').forEach(el => {
        let trueStatement = "This statement is true.";
        let falseStatement = "This statement is false.";
        setInterval(() => {
            if (el.innerHTML === trueStatement) {
                el.innerHTML = falseStatement;
            } else {
                el.innerHTML = trueStatement;
            }
        }, 1000); // Toggle every second
    });
    
}
function onload(){
    ksiTakeover();
    nsyncTakeover();
    liveTypingEffect();
    spinText();
    randomise();
    paradox();
}
setInterval(() => {
    document.querySelectorAll('goblin').forEach(el => {
        el.style.color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        el.style.fontSize = `${Math.floor(Math.random() * 50) + 10}px`;
        el.style.fontFamily = ['Arial', 'Courier', 'Comic Sans MS', 'Georgia', "'Consolas', monospace", '-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif'][Math.floor(Math.random() * 4)];
    });}, (goblinLength * 1250));

setInterval(() => {goblinLength = Math.random();}, 50);

// Run all functions when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', onload);