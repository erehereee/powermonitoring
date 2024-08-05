const TR = document.getElementById("T-R");

let updateData1 = function(value) {
    TR.innerHTML = value;
}

let xhr1 = new XMLHttpRequest();
xhr1.onreadystatechange = async function() {
  if(xhr1.readyState == 4 && xhr1.status == 200) {
    let data2 = await JSON.parse(this.responseText).data2;
  }
}

xhr1.open('GET', 'json/test.json', true);
xhr1.send();