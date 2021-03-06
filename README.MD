# Readable

![CI](https://github.com/williamfelippe/new-readable/workflows/CI/badge.svg)

Project created to auxiliate the interns of my team on their way to learn React/Redux

## Technologies

- React
- React Hook Form
- Yup
- Luxon
- Jest
- React Testing Library
- Redux Toolkit

## How to run

Install all dependencies
```sh
yarn
```

Run the project
```sh
yarn start
```

Simple as that :smile:

## Tests

To run the tests, simple type:

```sh
yarn test
```

This command execute the tests looking for possible memory leaks or errors when doing the tests. If you wanna run the tests more quickly, use:

```sh
yarn test:ci
```

## Folder structure

- root
  - config
    - jest
    - webpack
  - public
  - src
    - common
      - assets
      - components
      - routes
      - store
      - testsSuit
      - utils
    - modules
    - views
