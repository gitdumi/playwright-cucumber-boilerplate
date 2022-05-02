@productPage
Feature: Product page

  @smoke @ui
  Scenario: As a user I can access the product page
    Given that the user is logged in
    When the user selects a product
    Then the user finds that the product page is loaded correctly