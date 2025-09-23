### Toast

A local **prototype only** component which will give extra details on which options lead to which journey

#### Basic Usage

```
    {% from "includes/partials/toast/macro.njk" import cmgToast %}

    {{ cmgToast({
        title: "simple string content here",
        text: "simple text content here",
    }) }}
```

#### HTML Usage

```
    {% from "includes/partials/toast/macro.njk" import cmgToast %}

    {% set html %}
        <p class="govuk-body">
            We can even set HTML. You have 7 days left to send your application.
            <a class="govuk-link" href="#">do this</a>.
        </p>
        <ul class="govuk-body">
            <li>step 1</li>
            <li>step 2</li>
            <li>step 3</li>
            <li>step 4</li>
        </ul>
    {% endset %}

    {{ cmgToast({
        title: "simple string content here",
        html: html
    }) }}
```

#### Macro Options

| Name      | Type   | Description                                                                                                                                                    |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **text**  | string | **Required** The `text` that displays in the help toast. You can use any string with this option. If you set html, this option is not required and is ignored. |
| **html**  | html   | **Required**. The HTML to use within the help toast.                                                                                                           |
| **title** | string | The title text that displays in the help toast.                                                                                                                |
