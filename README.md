# Generate Markdown Table Action

![generate-markdown-table status](https://github.com/lee-dohm/generate-markdown-table/workflows/build-test/badge.svg "generate-markdown-table status")

A GitHub Action that generates a Markdown table.

## Use

Generates a Markdown table from the data and options stored in the JSON file at `inputPath`. It passes this information to [`markdown-table`](https://npmjs.org/package/markdown-table) to build the actual Markdown. The Markdown text is stored at `outputPath`.

Example input:

```javascript
{
  "data": [
    ['foo', 'bar', 'baz'],
    ['foo', 'bar', 'baz']
  ]
}
```

Output:

```markdown
| foo | bar | baz |
| --- | --- | --- |
| foo | bar | baz |
```

You can pass options to `markdown-table` using the `options` field:

```javascript
{
  "data": [
    ['foo', 'bar', 'baz'],
    ['foo', 'bar', 'baz']
  ],
  "options": {
    "align": ['l', 'c', 'r']
  }
}
```

### Inputs

* `inputPath` **required** -- Path where the JSON defining the data and options is stored. The file must be encoded as UTF-8.
* `outputPath` -- Path where the Markdown will be stored. Defaults to `inputPath` minus any extension plus `.md`.

### Outputs

* `outputPath` -- Path where the Markdown was stored. Same as the `outputPath` input.

## License

[MIT](LICENSE.md)
