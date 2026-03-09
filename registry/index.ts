import { RegistryTool } from "./types";
import { categories } from "./categories";

import { tool as colorConverterRegistry } from "./tools/converters/color-converter/registry";
import { tool as colorPickerRegistry } from "./tools/converters/color-picker/registry";
import { tool as unitConverterRegistry } from "./tools/converters/unit-converter/registry";
import { tool as passwordGeneratorRegistry } from "./tools/crypto-gen/password-generator/registry";
import { tool as uuidGeneratorRegistry } from "./tools/crypto-gen/uuid-generator/registry";
import { tool as diffCheckerRegistry } from "./tools/developer/diff-checker/registry";
import { tool as jsonFormatterRegistry } from "./tools/developer/json-formatter/registry";
import { tool as jwtDecoderRegistry } from "./tools/developer/jwt-decoder/registry";
import { tool as regexVisualizerRegistry } from "./tools/developer/regex-visualizer/registry";
import { tool as collaborativeNotepadRegistry } from "./tools/documents/collaborative-notepad/registry";
import { tool as htmlToPdfRegistry } from "./tools/documents/html-to-pdf/registry";
import { tool as imageToPdfRegistry } from "./tools/documents/image-to-pdf/registry";
import { tool as latexPreviewRegistry } from "./tools/documents/latex-preview/registry";
import { tool as markdownToPdfRegistry } from "./tools/documents/markdown-to-pdf/registry";
import { tool as pdfCompressRegistry } from "./tools/documents/pdf-compress/registry";
import { tool as pdfMergeRegistry } from "./tools/documents/pdf-merge/registry";
import { tool as pdfSplitRegistry } from "./tools/documents/pdf-split/registry";
import { tool as pdfToImageRegistry } from "./tools/documents/pdf-to-image/registry";
import { tool as simpleTextEditorRegistry } from "./tools/documents/simple-text-editor/registry";
import { tool as spreadsheetEditorRegistry } from "./tools/documents/spreadsheet-editor/registry";
import { tool as htmlToMarkdownRegistry } from "./tools/formatting/html-to-markdown/registry";
import { tool as markdownHtmlRegistry } from "./tools/formatting/markdown-html/registry";
import { tool as markdownPreviewRegistry } from "./tools/formatting/markdown-preview/registry";
import { tool as backgroundRemoverRegistry } from "./tools/image/background-remover/registry";
import { tool as faviconGeneratorRegistry } from "./tools/image/favicon-generator/registry";
import { tool as gifResizerRegistry } from "./tools/image/gif-resizer/registry";
import { tool as imageCompressorRegistry } from "./tools/image/image-compressor/registry";
import { tool as imageCropperRegistry } from "./tools/image/image-cropper/registry";
import { tool as imageFormatConverterRegistry } from "./tools/image/image-format-converter/registry";
import { tool as imageMetadataViewerRegistry } from "./tools/image/image-metadata-viewer/registry";
import { tool as imageResizerRegistry } from "./tools/image/image-resizer/registry";
import { tool as imageRotatorRegistry } from "./tools/image/image-rotator/registry";
import { tool as paletteGeneratorRegistry } from "./tools/image/palette-generator/registry";
import { tool as codePlaygroundRegistry } from "./tools/playground/code-playground/registry";
import { tool as colorGradientGeneratorRegistry } from "./tools/playground/color-gradient-generator/registry";
import { tool as cssPlaygroundRegistry } from "./tools/playground/css-playground/registry";
import { tool as htmlPlaygroundRegistry } from "./tools/playground/html-playground/registry";
import { tool as jsConsoleRunnerRegistry } from "./tools/playground/js-console-runner/registry";
import { tool as jsonApiTesterRegistry } from "./tools/playground/json-api-tester/registry";
import { tool as pythonVisualizerRegistry } from "./tools/playground/python-visualizer/registry";
import { tool as regexTesterRegistry } from "./tools/playground/regex-tester/registry";
import { tool as sqlFormatterRegistry } from "./tools/playground/sql-formatter/registry";
import { tool as sqlVisualizerRegistry } from "./tools/playground/sql-visualizer/registry";
import { tool as annoyingTextGeneratorRegistry } from "./tools/text/annoying-text-generator/registry";
import { tool as base64EncoderRegistry } from "./tools/text/base64-encoder/registry";
import { tool as duplicateLineRemoverRegistry } from "./tools/text/duplicate-line-remover/registry";
import { tool as emojiGeneratorRegistry } from "./tools/text/emoji-generator/registry";
import { tool as randomTextGeneratorRegistry } from "./tools/text/random-text-generator/registry";
import { tool as specialCharacterPickerRegistry } from "./tools/text/special-character-picker/registry";
import { tool as textCaseConverterRegistry } from "./tools/text/text-case-converter/registry";
import { tool as textDiffViewerRegistry } from "./tools/text/text-diff-viewer/registry";
import { tool as textSorterRegistry } from "./tools/text/text-sorter/registry";
import { tool as urlEncoderRegistry } from "./tools/text/url-encoder/registry";
import { tool as wordCloudGeneratorRegistry } from "./tools/text/word-cloud-generator/registry";
import { tool as wordCounterRegistry } from "./tools/text/word-counter/registry";
import { tool as cssMinifierRegistry } from "./tools/web-dev/css-minifier/registry";
import { tool as htmlMinifierRegistry } from "./tools/web-dev/html-minifier/registry";
import { tool as jsMinifierRegistry } from "./tools/web-dev/js-minifier/registry";

export const allRegistryTools: RegistryTool[] = [
  colorConverterRegistry,
  colorPickerRegistry,
  unitConverterRegistry,
  passwordGeneratorRegistry,
  uuidGeneratorRegistry,
  diffCheckerRegistry,
  jsonFormatterRegistry,
  jwtDecoderRegistry,
  regexVisualizerRegistry,
  collaborativeNotepadRegistry,
  htmlToPdfRegistry,
  imageToPdfRegistry,
  latexPreviewRegistry,
  markdownToPdfRegistry,
  pdfCompressRegistry,
  pdfMergeRegistry,
  pdfSplitRegistry,
  pdfToImageRegistry,
  simpleTextEditorRegistry,
  spreadsheetEditorRegistry,
  htmlToMarkdownRegistry,
  markdownHtmlRegistry,
  markdownPreviewRegistry,
  backgroundRemoverRegistry,
  faviconGeneratorRegistry,
  gifResizerRegistry,
  imageCompressorRegistry,
  imageCropperRegistry,
  imageFormatConverterRegistry,
  imageMetadataViewerRegistry,
  imageResizerRegistry,
  imageRotatorRegistry,
  paletteGeneratorRegistry,
  codePlaygroundRegistry,
  colorGradientGeneratorRegistry,
  cssPlaygroundRegistry,
  htmlPlaygroundRegistry,
  jsConsoleRunnerRegistry,
  jsonApiTesterRegistry,
  pythonVisualizerRegistry,
  regexTesterRegistry,
  sqlFormatterRegistry,
  sqlVisualizerRegistry,
  annoyingTextGeneratorRegistry,
  base64EncoderRegistry,
  duplicateLineRemoverRegistry,
  emojiGeneratorRegistry,
  randomTextGeneratorRegistry,
  specialCharacterPickerRegistry,
  textCaseConverterRegistry,
  textDiffViewerRegistry,
  textSorterRegistry,
  urlEncoderRegistry,
  wordCloudGeneratorRegistry,
  wordCounterRegistry,
  cssMinifierRegistry,
  htmlMinifierRegistry,
  jsMinifierRegistry
];

export function getRegistryTool(slug: string): RegistryTool | undefined {
  return allRegistryTools.find((t) => t.slug === slug);
}

export function getToolsForCategory(categorySlug: string): RegistryTool[] {
  return allRegistryTools.filter((t) => t.category === categorySlug);
}

export function getAllCategories() {
  return categories;
}
