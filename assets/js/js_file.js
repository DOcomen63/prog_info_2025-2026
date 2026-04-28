//Bouton pour faire apparaitre les autres sections
function toggleSection(sectionId, buttonId) {
    var content = document.getElementById(sectionId);
    var btn = document.getElementById(buttonId);
    
    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
        
        btn.textContent = (buttonId === 'btn_more') ? "Masquer CV": "Masquer Outils";
    } else {
        content.style.display = "none";
        btn.textContent = (buttonId === 'btn_more') ? "Afficher CV": "Afficher Outils";
    }
}

//Boutons pour afficher date+heure (style unchanged) ; mettre la phrase tout en majuscule
function showDateTime() {
    const d = new Date();
    document.getElementById("full_datetime").innerHTML = d.toLocaleString();
}
function makeUppercase() {
    let element = document.getElementById("date_maj");
    element.innerHTML = element.innerHTML.toUpperCase();
}

let loadedText = "";
document.getElementById('fileIn').addEventListener('change', function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function (event) {
        loadedText = event.target.result;
        document.getElementById('displayA').innerText = loadedText;
        console.log("File loaded successfully");
    };
    
    reader.readAsText(file);
});


//Afficher dans la boite nommée DisplayA
function getLoadedText() {
    return document.getElementById("displayA").innerText;
}

function displayMessage() {
    
    const hiddenText = document.getElementById("hidden_HNG_text").textContent;
    //récupération du texte caché dans le script
    //Le texte est un extrait du premier volume de Ascendance of a Bookworm, Part 1 : Daughter of a Soldier, Volume 1, Miya Kazuki, édition TO Books
    
    document.getElementById("displayA").innerText = hiddenText;
}

function segmentation() {
    let text = getLoadedText();
    if (! text) return alert("Veuillez d'abord charger un texte ");
    
    let tokens = text.replace(/[.,;!?\n]/g, " ").split(/\s+/).filter(x => x);
    document.getElementById("pageAn").innerText = tokens.join('\n');
}

//Compte les occurences des éléments ayant été segmentés
function dictionnaire() {
    let text = getLoadedText();
    if (! text) return;
    let tokens = text.toLowerCase().replace(/[.,;!?\n]/g, " ").split(/\s+/).filter(x => x);
    let freq = {
    };
    tokens.forEach(w => freq[w] = (freq[w] || 0) + 1);
    
    let res = "";
    Object.keys(freq).sort().forEach(w => {
        res += w + " : " + freq[w] + "\n";
    });
    //Affichage dans la boite des analyses
    document.getElementById("pageAn").innerText = res;
}

function NB_phrases() {
    let text = getLoadedText();
    if (! text) return alert("Chargez un texte d'abord");
    
    //A l'aide de Regex, on cherche la fin de phrases grace a la ponctuation
    let sentences = text.split(/[.!?]/).filter(x => x.trim());
    let count = sentences.length;
    
    document.getElementById("pageAn").innerText = "Nombre total de phrases : " + count;
}


function replaceLtoI() {
    let text = getLoadedText();
    document.getElementById("pageAn").innerText = text.replace(/l/g, "I");
}
// Remplace l par I avec l'aide de Regex