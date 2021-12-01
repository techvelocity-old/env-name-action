# env-name-action

This is a GitHub Action to generate a valid environment name that could be used later in a URL.

## Examples

Incorporate the following action in your workflow to generate the name and pass it to other steps (like [`techvelocity/env-create-action`](https://github.com/techvelocity/env-create-action)).

```yml
steps:
  - uses: techvelocity/env-name-action@v1 # Generate a valid name based on the branch/PR
    id: env-name
  - uses: actions/checkout@v2 # Checkout
  - uses: docker/build-push-action@v2 # Build
    with:
      push: true
      tags: org/repo:${{ steps.env-name.outputs.name }}
  - uses: techvelocity/env-create-action@v1
    with:
      velocity-token: ${{ secrets.VELOCITY_TOKEN }}
      services: '${{ env.VELOCITY_SERVICE }}:${{ steps.env-name.outputs.name }}'
      name: ${{ steps.env-name.outputs.name }}
```

Or with a specific pattern (`ci-{name}`):

```yml
steps:
  - uses: techvelocity/env-name-action@v1
    id: env-name
    with:
      pattern: ci-{name}
  - uses: actions/checkout@v2 # Checkout
  - uses: docker/build-push-action@v2 # Build
    with:
      push: true
      tags: org/repo:${{ steps.env-name.outputs.name }}
  - uses: techvelocity/env-create-action@v1
    with:
      velocity-token: ${{ secrets.VELOCITY_TOKEN }}
      services: '${{ env.VELOCITY_SERVICE }}:${{ steps.env-name.outputs.name }}'
      name: ${{ steps.env-name.outputs.name }}
```

## Inputs

The following inputs are optional:

| Name      | Description                                                                                                                 | Default  |
| --------- | --------------------------------------------------------------------------------------------------------------------------- | -------- |
| `max`     | Maximum characters to be used. The default should be good enough, but if you have any concerns you should lower the number. | `40`     |
| `pattern` | A pattern for the name. Use `{name}` as a placeholder                                                                       | `{name}` |
