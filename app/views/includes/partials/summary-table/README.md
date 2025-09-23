### Summary Table

A local component which gives a summary of information in a table based layout.

#### Basic Usage

```
    {% from "includes/partials/summary-table/macro.njk" import cmgSummaryTable %}

    {% set html %}
      <table> ... </table>
    {% endset %}

    {{ cmgSummaryTable({
        title: "Messages",
        content: html,
        action: "<a href='#'>View all</a>"
    }) }}
```

#### Macro Options

| Name       | Type   | Description                                                                     |
| ---------- | ------ | ------------------------------------------------------------------------------- |
| **title**  | string | **Required** The `text` that displays in the title section of the summary table |
| **html**   | html   | **Required** HTML for the contents of the summary table.                        |
| **action** | string | **Required** The action link to the main content                                |
