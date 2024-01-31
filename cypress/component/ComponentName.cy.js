describe('my awsome website', ()=>{
  beforeEach(()=>{
    cy.visit('http:/localhost:5050')
  })

  it('allows user to sign up',()=>{
    cy.get('h1').should('contain.text','Login');

    cy.get('input').type('hi-mom');

    cy.get('button'),click();

    cy.get(h1).should('contain.text','success!');

  })
})