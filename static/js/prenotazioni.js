const form=document.querySelector("#booking-form");
if(form)form.addEventListener("submit",async event=>{
  event.preventDefault();
  const status=document.querySelector("#form-status"),data=Object.fromEntries(new FormData(form).entries()),selected=new Date(`${data.date}T00:00:00`),today=new Date(),english=document.documentElement.lang==="en";
  today.setHours(0,0,0,0);
  if(!form.reportValidity()||selected<today||Number(data.people)<1){status.textContent=english?"Check the required fields.":"Controlla i campi obbligatori.";return}
  const hasHealthData=/allerg|intoler|celiac|gluten|lactos|health|medic|diabet/i.test(data.notes||"");
  if(hasHealthData&&data.health_consent!=="1"){status.textContent=english?"Explicit consent is required to send health-related notes.":"Per inviare note relative alla salute è necessario il consenso esplicito.";return}
  if(!form.dataset.whatsapp){status.textContent=english?"WhatsApp is not configured yet. Contact the restaurant directly.":"Il numero WhatsApp non è ancora configurato. Contatta direttamente il ristorante.";return}
  try{
    const response=await fetch("/prenotazioni",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
    if(!response.ok)throw new Error;
    const date=selected.toLocaleDateString(english?"en-GB":"it-IT"),message=english?["Hello! I would like to book a table at Atelier Doria.",`Name: ${data.name}`,`Phone: ${data.phone||"-"}`,`Date: ${date}`,`Time: ${data.time}`,`Guests: ${data.people}`,`Notes: ${data.notes||"-"}`,`Health-data consent: ${data.health_consent==="1"?"yes":"not provided"}`]:["Ciao! Vorrei prenotare un tavolo da Atelier Doria.",`Nome: ${data.name}`,`Telefono: ${data.phone||"-"}`,`Data: ${date}`,`Ora: ${data.time}`,`Persone: ${data.people}`,`Note: ${data.notes||"-"}`,`Consenso dati salute: ${data.health_consent==="1"?"prestato":"non prestato"}`];
    window.open(`https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(message.join("\n"))}`,"_blank","noopener");
    status.textContent=english?"WhatsApp opened. Send the message to complete your request.":"WhatsApp aperto. Invia il messaggio per completare la richiesta."
  }catch{status.textContent=english?"The request could not be prepared. Please try again.":"Non è stato possibile preparare la richiesta. Riprova."}
});
