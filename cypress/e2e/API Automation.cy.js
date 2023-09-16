it('Get Response',()=>{

  cy.request({
      method: 'GET',
      url: 'users',
      headers: {'Content-Type': 'application/json'}
    })

  .then((response)=>{
    expect(response.status).to.eq(200)
    expect(response.body).to.not.be.null

    const newId = response.body.find(item => item.username === 'Antonette').id

    cy.request({
          method: 'GET',
          url: 'posts',
          qs: {'id': newId},
          headers: {'Content-Type': 'application/json'}
        })

        .then((response)=>{
          expect(response.status).to.eq(200)
          cy.writeFile('cypress/fixtures/data.json', response.body)
        })

        cy.request({
              method: 'POST',
              url: 'posts',
              qs: {'id': newId},
              headers: {'Content-Type': 'application/json'},
              body: {
                'tilte' : "QA Automation",
                'body' : "QA Automation Engineering",
                'userId' : 101,
                'id': 201
              } 
            }) 
        
            .then((response)=>{
              expect(response.status).to.eq(201);  
                const fileName = 'cypress/fixtures/data.json'
                const target = (response.body)
                cy.log(target)

              cy.readFile(fileName).then(()=>{
                cy.writeFile(fileName, {target}, {flag: 'a+'})
              })           
            })
   })
})
