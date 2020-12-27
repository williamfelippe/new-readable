Feature: FirstTest

  Scenario:
    Given I visit initial page
    When I click the first post
    Then the url should include /post
