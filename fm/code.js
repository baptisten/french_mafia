fetch('fm/data.json', {mode: 'no-cors'})
  .then(function(res) {
    return res.json()
  })
  .then(function(data) {
    var buttons = ['Ideo','Ammu','Bachs','Google','Apple','HTC','Facebook','1518','3841','Alvarado','Other','Couple'];
    var labelsVisibility = 1;
    var showAllButtonValue = 0;

    var cy = window.cy = cytoscape({

      container: document.getElementById('cy'),

      boxSelectionEnabled: false,
      autounselectify: true,

      layout: {
        name: 'cose',
        animate: false
      },

      style: [
        {
          selector: 'node',
          style: {
            'text-valign': 'center',
            'color': 'data(insf)',
            'text-outline-width': 2,
            'background-color': 'data(color)',
            'text-outline-color': 'data(color)',
            'content': 'data(name)',
            'opacity':0.75
          }
        },
        {
          selector: ':selected',
          style: {
            'color': 'red',
            'background-color': 'red'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': 'data(color)',
            'curve-style': 'bezier',
            'content': 'data(name)',
            'font-size':'9',
            'color':'#1D2432',
            'text-outline-width': 1,
            'text-outline-color': 'data(color)',
            'opacity':0,
            'text-opacity':1
          }
          ,
        }
      ],

      elements: data,

      ready: function(){
          cy.on('tap', function(evt){
          if(evt.target.length){
            var elem = evt.target;
            console.log(elem);

            if(elem.group() == "nodes"){

              var selectedFrench = elem.id();
              if(elem.style('opacity') == 1){
                elem.style({'opacity':0.75});
                cy.edges('[source="' + selectedFrench + '"]').style({'opacity':0,'text-opacity':labelsVisibility});
                cy.edges('[target="' + selectedFrench + '"]').style({'opacity':0,'text-opacity':labelsVisibility});
              }else{
                elem.style({'opacity':1});
                cy.edges('[source="' + selectedFrench + '"]').style({'opacity':1,'text-opacity':labelsVisibility});
                cy.edges('[target="' + selectedFrench + '"]').style({'opacity':1,'text-opacity':labelsVisibility});
              }
            }
          }
        });

        //Button logic
        buttons.forEach(function (item) {
          var currentButt = document.getElementById(item);
          var currentButtValue = false;

          currentButt.onclick = function(){
            if(!(currentButtValue)){
              cy.edges('[name="' + item +'"]').style({'opacity':1,'text-opacity':labelsVisibility});
              currentButtValue = true;
              currentButt.className += " selected";
            }else{
              cy.edges('[name="' + item +'"]').style({'opacity':0,'text-opacity':labelsVisibility});
              currentButtValue = false;
              currentButt.className = "butt";
            }
          }
        });

        //Label button
        var labelButton = document.getElementById('labels');
        labelButton.onclick = function(){

          if(labelsVisibility == 0){
            labelsVisibility = 1;
            cy.edges().style({'text-opacity':1});
            labelButton.className = "butt";
          }else{
            labelsVisibility = 0;
            cy.edges().style({'text-opacity':0});
            labelButton.className += " selected";
          }
        }

        //Show ALL
        var showAllButton = document.getElementById('ShowAll');
        showAllButton.onclick = function(){
          if(showAllButtonValue == 0){
            cy.edges().style({'opacity':1,'text-opacity':labelsVisibility});
            cy.nodes().style({'opacity':1});
            showAllButtonValue = 1;
            showAllButton.className += " selected";
          }else{
            cy.edges().style({'opacity':0,'text-opacity':labelsVisibility});
            cy.nodes().style({'opacity':0.75});
            showAllButtonValue = 0;
            showAllButton.className = "butt";
          }
        }
      }

    });
  });


//COLOR REF

// male = #426EB3
// female = #A2224F
// workrel = #7CB72A
// liverel =  #E8A109
// notinsf = #1D2432
// couples = #e800bf

// JSON editor : http://www.alkemis.com/jsonEditor.htm
// COnvert csv to json : http://www.convertcsv.com/csv-to-json.htm
