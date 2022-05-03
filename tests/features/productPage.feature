@productPage
Feature: Product page

  @smoke @ui
  Scenario Outline: As a user I can access the product page
    Given that the "<user>" user is logged in
    When the user selects a product
    Then the user finds that the product page is loaded correctly

    Examples:
      | user     |
      | standard |
      | problem  |