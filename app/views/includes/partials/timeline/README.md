### Timeline

A local component which gives a vertical timeline listing steps in a process flow.

#### Basic Usage

```
    {% from "includes/partials/timeline/macro.njk" import cmgTimeline %}

    {{cmgTimeline({
    events: [
    {
      title: { text: 'Response submitted'},
      by: 'DWP Appeals Officer',
      dateUtc: '2018-01-25T14:04',
      date: '25 Jan 2018',
      time: '14:04pm',
      description: { text: 'This is a description of the event. And this is what happens when it is long.' },
      documents: [{
        name: 'Statement of information',
        href: '#1'
      }, {
        name: 'Another document',
        href: '#2'
      }]
    },
```

#### Macro Options

| Name       | Type   | Description                                                                     |
| ---------- | ------ | ------------------------------------------------------------------------------- |
| **title**  | string | **Required** The `text` that displays in the title section of the summary table |
| **html**   | html   | **Required** HTML for the contents of the summary table.                        |
| **action** | string | **Required** The action link to the main content                                |
