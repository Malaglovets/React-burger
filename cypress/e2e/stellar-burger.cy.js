import { config } from "../../src/utils/api"
//проверка на коректность работы приложения и перехода по страницам
describe('app works correctly with routes', () => {
  beforeEach("открытие страницы", () => {
    cy.visit('http://localhost:3000#/');
    cy.viewport(1280, 1024)
  });
//проверка модального окна ingredientDetails
  it('should check modal ingredient details', () => {
    cy.intercept(`${config.baseUrl}/ingredients`).as('getIngredients')
    cy.wait('@getIngredients')
    cy.get('a').contains('Флюоресцентная булка').click()
    cy.contains('Детали ингридиента').should('be.visible');
    cy.get('[class^=Modal_close_]').click()
    cy.contains('Детали ингридиента').should('not.exist');
  });
//проверка перетаскивания ингредиетов
  it('should drag ang drop ingredients', function() {
    cy.intercept(`${config.baseUrl}/ingredients`).as('getIngredients')
    cy.wait('@getIngredients')
    cy.get('span').contains('Соусы').click()
    cy.contains('Соус Spicy-X').should('be.visible')
    cy.contains('Краторная булка N-200i').should('be.not.visible')
    cy.get('span').contains('Начинки').click()
    cy.contains('Соус Spicy-X').should('be.not.visible')
    cy.contains('Краторная булка N-200i').should('be.not.visible')
    cy.contains('Мясо бессмертных моллюсков Protostomia').should('be.visible')
    cy.get('span').contains('Булки').click()
    cy.contains('Краторная булка N-200i').should('be.visible')
  })
//полная проверка оформления заказа
  it('should drag ingredients, login, make order again, check preloader and popup with order ', function() {
    cy.intercept(`${config.baseUrl}/ingredients`).as('getIngredients')
    cy.wait('@getIngredients')
    const dataTransfer = new DataTransfer();
    cy.get('a').contains('Краторная булка N-200i').trigger('dragstart', { dataTransfer });
    cy.get('[class^=BurgerConstructor_order]').trigger('drop', { dataTransfer });
    cy.get('a').contains('Соус фирменный Space Sauce').trigger('dragstart', { dataTransfer });
    cy.get('[class^=BurgerConstructor_order]').trigger('drop', { dataTransfer });
    cy.get('a').contains('Филе Люминесцентного тетраодонтимформа').trigger('dragstart', { dataTransfer });
    cy.get('[class^=BurgerConstructor_order]').trigger('drop', { dataTransfer });
    cy.get('a').contains('Мини-салат Экзо-Плантаго').trigger('dragstart', { dataTransfer });
    cy.get('[class^=BurgerConstructor_order]').trigger('drop', { dataTransfer });
    cy.get('button').contains('Оформить заказ').click();
    cy.get('[type=email]').type('Malaglovets.v@gmail.com');
    cy.get('[type=password]').type('11111111');
    cy.get('button').contains('Войти').click();
    cy.get('button').contains('Оформить заказ').click();
    cy.contains('Отправляю заказ...').should('be.visible');
    cy.intercept(`${config.baseUrl}/orders`).as('getOrder');
    cy.wait('@getOrder');
    cy.contains('идентификатор заказа').should('be.visible');
    cy.get('[class^=Modal_close]').click()
    cy.contains('идентификатор заказа').should('not.exist');
  })
}); 

