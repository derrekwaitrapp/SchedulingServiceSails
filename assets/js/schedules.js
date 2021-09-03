document.addEventListener('DOMContentLoaded', function() {

  let subMarket = {};
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {

    if (this.readyState === 4 && this.status === 200) {

      subMarket = JSON.parse(this.responseText);
      let scheduleElement = document.getElementById('schedule');
      scheduleElement.innerHTML = ``;

      const userId = 3;

      for(const block of subMarket.blocks){

        const blockElement = document.createElement('div');

        const disabled = (block.claimedByUsers.length > 5 ? "disabled" : "");

        let claimButton = `<button id="${block.id}" class="claim_block btn btn-primary btn-lg " ${disabled} href="#"  >CLAIM</button>`

        const driver = block.claimedByUsers.find( user => user.id === userId);
        if(driver){
          console.log("its me", driver);
        }

        const claimedByUser = (block.claimedByUsers.length > 0 && block.claimedByUsers[0].name ? block.claimedByUsers[0].name : "");

        console.log("claimedByUser", claimedByUser);

        if(block.claimedByUsers.length > 0 && driver){
          claimButton = `<button id="${block.id}" class="claimed_block btn btn-danger btn-lg " href="#"  >DROP</button>`
        }

        blockElement.innerHTML = `
              <div class="block">
                <div>
                  <span class="environment">${moment(block.start).format('dddd MMMM Do YYYY')}</strong></span>
                  <p>
                     <strong>${subMarket.name}</strong> - ${block.title}
                     <strong>Claimed by ${block.claimedByUsers.length} other drivers</strong>
                  </p>
                  <p><strong>${moment(block.start).format('h:mm a')} -  ${moment(block.end).format('h:mm a')}</strong></p>
                </div>
                <div class="text-align-right ">
                       ${claimButton}
                </div>
              </div>
            `;
        scheduleElement.appendChild(blockElement);
        console.log(block);
      }



      $('.claim_block').click(function(){
        console.log("click");
        const id = $(this).attr('id');

        console.log(id);
        $.ajax({
          'type':'POST',
          'success':function(data) { console.log('success', data); getClaims(); },
          'error':function(){ console.error('error') },
          'url':`/blocks/${id}/claim/${userId}`,
          'cache':true
        });

      });

      $('.claimed_block').click(function(){
        console.log("click");
        const id = $(this).attr('id');

        console.log(id);
        $.ajax({
          'type':'PATCH',
          'data':``,
          'success':function(data) { console.log('success', data); getClaims();  },
          'error':function(){ console.error('error') },
          'url':`/blocks/${id}/dropClaim/${userId}`,
          'cache':true
        });

      });

    }
  };

  function getClaims() {
    xhttp.open("GET", "/submarkets/1/", true);
    xhttp.send();
  }
  getClaims();

});
