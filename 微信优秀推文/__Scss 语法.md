## Scss 模块化语法

### CSS功能拓展

1. 嵌套

2. 父选择器 **&**

   1. ```scss
      a {
        font-weight: bold;
        text-decoration: none;
        &:hover { text-decoration: underline; }
        body.firefox & { font-weight: normal; } // 这种不太直观
      }
      ```

      编译为

      ```css
      a {
        font-weight: bold;
        text-decoration: none; }
        a:hover {
          text-decoration: underline; }
        body.firefox a {
          font-weight: normal; }
      ```

   2. `&` 必须作为选择器的第一个字符，其后可以跟随后缀生成复合的选择器，例如

      ```scss
      #main {
        color: black;
        &-sidebar { border: 1px solid; }
      }
      ```

      编译为

      ```css
      #main {
        color: black; }
        #main-sidebar {
          border: 1px solid; }
      ```

3. 属性嵌套

   有些 CSS 属性遵循相同的命名空间 (namespace)，比如 `font-family, font-size, font-weight` 都以 `font` 作为属性的命名空间。

   ```scss
   .funky {
     font: {
       family: fantasy;
       size: 30em;
       weight: bold;
     }
   }
   ```

   编译为

   ```css
   .funky {
     font-family: fantasy;
     font-size: 30em;
     font-weight: bold; }
   ```

   命名空间也可以包含自己的属性值，例如：

   ```scss
   .funky {
     font: 20px/24px {
       family: fantasy;
       weight: bold;
     }
   }
   ```

   编译为

   ```css
   .funky {
     font: 20px/24px;
       font-family: fantasy;
       font-weight: bold; }
   ```

### SassScipt

在 CSS 属性的基础上 Sass 提供了一些名为 SassScript 的新功能。 

SassScript 可作用于任何属性，允许属性使用变量、算数运算等额外功能。

通过 interpolation，SassScript 甚至可以生成选择器或属性名，这一点对编写 mixin 有很大帮助。

1. Interactive Shell, 命令行中进行运算

   ```sh
   $ sass -i
   >> "Hello, Sassy World!"
   "Hello, Sassy World!"
   >> 1px + 1px + 1px
   3px
   >> #777 + #777
   #eeeeee
   >> #777 + #888
   white
   ```

2. 变量 `$` (Variables: `$`)

   SassScript 最普遍的用法就是变量，变量以美元符号开头，

   变量支持块级作用域，嵌套规则内定义的变量只能在嵌套规则内使用（局部变量），不在嵌套规则内定义的变量则可在任何地方使用（全局变量）。

   将局部变量转换为全局变量可以添加 `!global` 声明：

   **CSS 可以直接使用变量**

   ```
   --height: 40px;
   height: var(--height); // CSS
   
   $height: 40px;
   height: $height;
   ```

3. 数据类型 (Data Types)

SassScript 支持 6 种主要的数据类型：

- 数字，`1, 2, 13, 10px`
- 字符串，有引号字符串与无引号字符串，`"foo", 'bar', baz`
- 颜色，`blue, #04a3f9, rgba(255,0,0,0.5)`
- 布尔型，`true, false`
- 空值，`null`
- 数组 (list)，用空格或逗号作分隔符，`1.5em 1em 0 2em, Helvetica, Arial, sans-serif`
- maps, 相当于 JavaScript 的 object，`(key1: value1, key2: value2)`

4. 运算 + 圆括号

   所有数据类型均支持相等运算 `==` 或 `!=`，此外，每种数据类型也有其各自支持的运算方式。 圆括号可以用来影响运算的顺序

5. 内置函数 [$](https://sass-lang.com/documentation/modules)

6. 插值语句 `#{}` (Interpolation: `#{}`)

   通过 `#{}` 插值语句可以**在选择器或属性名中使用变量**：

   ```scss
   $name: foo;
   $attr: border;
   p.#{$name} {
     #{$attr}-color: blue;
   }
   ```

   编译为

   ```css
   p.foo {
     border-color: blue; }
   ```

   `#{}` 插值语句也可以在属性值中插入 SassScript，大多数情况下，这样可能还不如使用变量方便，但是使用 `#{}` 可以避免 Sass运行运算表达式，直接编译 CSS。

   ```scss
   p {
     $font-size: 12px;
     $line-height: 30px;
     font: #{$font-size}/#{$line-height};
   }
   ```

   编译为

   ```css
   p {
     font: 12px/30px; }
   ```

7. 变量定义 `!default` (Variable Defaults: `!default`)

   可以**在变量的结尾添加 `!default` **给一个未通过 `!default` 声明赋值的变量赋值，此时，如果变量已经被赋值，不会再被重新赋值，但是如果变量还没有被赋值或者为null空值时，则会被赋予新的值。

   ```scss
   $content: "First content";
   $content: "Second content?" !default;
   $new_content: "First time reference" !default;
   
   #main {
     content: $content;
     new-content: $new_content;
   }
   ```

   编译为

   ```css
   #main {
     content: "First content";
     new-content: "First time reference"; }
   ```

8. @-Rules 与指令 (@-Rules and Directives)

   + @import 

     Sass 拓展了 `@import` 的功能，允许其导入 SCSS 或 Sass 文件。

     被导入的文件将合并编译到同一个 CSS 文件中

     另外，被导入的文件中所包含的变量或者混合指令 (mixin) 都可以在导入的文件中使用。

     通常，`@import` 寻找 Sass 文件并将其导入，但在以下情况下，`@import` 仅作为普通的 CSS 语句，不会导入任何 Sass 文件。

     - 文件拓展名是 `.css`；
     - 文件名以 `http://` 开头；
     - 文件名是 `url()`；
     - `@import` 包含 media queries

     如果不在上述情况内，文件的拓展名是 `.scss` 或 `.sass`，则导入成功。

     没有指定拓展名，Sass 将会试着寻找文件名相同，拓展名为 `.scss` 或 `.sass` 的文件并将其导入。

   + @midia

   + @extend

     在设计网页的时候常常遇到这种情况：一个元素使用的样式与另一个元素完全相同，但又添加了额外的样式。

     通常会在 HTML 中给元素定义两个 class，一个通用样式，一个特殊样式。

     假设现在要设计一个普通错误样式与一个严重错误样式，一般会这样写：

     ```html
     <div class="error seriousError">
       Oh no! You've been hacked!
     </div>
     ```

     样式如下

     ```css
     .error {
       border: 1px #f00;
       background-color: #fdd;
     }
     .seriousError {
       border-width: 3px;
     }
     ```

     麻烦的是，这样做必须时刻记住使用 `.seriousError` 时需要参考 `.error` 的样式，带来了很多不变：智能比如加重维护负担，导致 bug，或者给 HTML 添加无语意的样式。

     使用 `@extend` 可以避免上述情况，告诉 Sass **将一个选择器下的所有样式继承给另一个选择器**。

     ```scss
     .error {
       border: 1px #f00;
       background-color: #fdd;
     }
     .seriousError {
       @extend .error;
       border-width: 3px;
     }
     ```

     上面代码的意思是将 `.error` 下的所有样式继承给 `.seriousError`，`border-width: 3px;` 是单独给 `.seriousError` 设定特殊样式，这样，使用 `.seriousError` 的地方可以不再使用 `.error`。

     **其他使用到 `.error` 的样式也会同样继承给 `.seriousError`**，例如，另一个样式 `.error.intrusion` 使用了 `hacked.png` 做背景，`<div class="seriousError intrusion">` 也同样会使用 `hacked.png` 背景。

     ```css
     .error.intrusion {
       background-image: url("/image/hacked.png");
     }
     ```

     - `@extend` 的作用是将重复使用的样式 (`.error`) 延伸 (extend) 给需要包含这个样式的特殊样式（`.seriousError`），刚刚的例子：

       ```scss
       .error {
         border: 1px #f00;
         background-color: #fdd;
       }
       .error.intrusion {
         background-image: url("/image/hacked.png");
       }
       .seriousError {
         @extend .error;
         border-width: 3px;
       }
       ```

       编译为

       ```css
       .error, 
       .seriousError {
         border: 1px #f00;
         background-color: #fdd; }
       
       .error.intrusion, 
       .seriousError.intrusion {
         background-image: url("/image/hacked.png"); }
       
       .seriousError {
         border-width: 3px; }
       ```

       当合并选择器时，`@extend` 会很聪明地避免无谓的重复，`.seriousError.seriousError` 将编译为 `.seriousError`，不能匹配任何元素的选择器（比如 `#main#footer` ）也会删除。

   + 复杂延伸

   + 多重延伸

   + 链式延伸

   + @extend-Only

   + !optional声明

   + ...

9. @at-root

   The @at-root directive causes one or more rules **to be emitted at the root of the document**, rather than being nested beneath their parent selectors. 

   使选择器和其内部规则上升至最外部, 而不是嵌套在父级选择器内部

   It can either be used with a single **inline selector**:

   ```scss
   .parent {
     ...
     @at-root .child { ... }
   }
   ```

   Which would produce:

   ```css
   .parent { ... }
   .child { ... }
   ```

   Or it can be used with **a block containing multiple selectors**:

   ```scss
   .parent {
     ...
     @at-root {
       .child1 { ... }
       .child2 { ... }
     }
     .step-child { ... }
   }
   ```

   Which would output the following:

   ```css
   .parent { ... }
   .child1 { ... }
   .child2 { ... }
   .parent .step-child { ... }
   ```

   - @at-root (without: ...) and @at-root (with: ...)

10. @debug

11. @warn

12. 控制指令

    1. if() 内置函数

    2. @if

       当 `@if` 的表达式返回值不是 `false` 或者 `null` 时，条件成立，输出 `{}` 内的代码：

       ```scss
       p {
         @if 1 + 1 == 2 { border: 1px solid; }
         @if 5 < 3 { border: 2px dotted; }
         @if null  { border: 3px double; }
       }
       ```

       编译为

       ```css
       p {
         border: 1px solid; }
       ```

       `@if` 声明后面可以跟多个 `@else if` 声明，或者一个 `@else` 声明。

    3. @for ~ 循环

       `@for` 指令可以**在限制的范围内重复输出格式**，每次按要求（变量的值）对输出结果做出变动。

       这个指令包含两种格式：

       `@for $var from <start> through <end> `，

       `@for $var from <start> to <end> `，

       区别在于 `through` 与 `to` 的含义：

       ​	使用 `through` 时，条件范围包含两个边界值，

       ​	使用 `to` 时条件范围只包含start边界。

       另外，`$var` 可以是任何变量，比如 `$i`；`<start>` 和 `<end>` 必须是整数值。

       ```scss
       @for $i from 1 through 3 {
         .item-#{$i} { width: 2em * $i; }
       }
       ```

       编译为

       ```css
       .item-1 {
         width: 2em; }
       .item-2 {
         width: 4em; }
       .item-3 {
         width: 6em; }
       ```

    4. @each

       `@each` 指令的格式是 `$var in `, `$var` 可以是任何变量名，比如 `$length` 或者 `$name`，而 `<list>` 是一连串的值，也就是值列表。

       `@each` 将变量 `$var` 作用于值列表中的每一个项目，然后输出结果，例如：

       ```scss
       @each $animal in puma, sea-slug, egret, salamander {
         .#{$animal}-icon {
           background-image: url('/images/#{$animal}.png');
         }
       }
       ```

       编译为

       ```css
       .puma-icon {
         background-image: url('/images/puma.png'); }
       .sea-slug-icon {
         background-image: url('/images/sea-slug.png'); }
       .egret-icon {
         background-image: url('/images/egret.png'); }
       .salamander-icon {
         background-image: url('/images/salamander.png'); }
       ```

       1. 多重声明 Multiple Assignment

          @each指令同样可以使用多个变量, 例如`@each $var1, $var2, ... in . `

          如果是列表列表，则子列表的每个元素都分配给相应的变量。如

          ```scss
          @each $animal, $color, $cursor in (puma, black, default),
                                            (sea-slug, blue, pointer),
                                            (egret, white, move) {
            .#{$animal}-icon {
              background-image: url('/images/#{$animal}.png');
              border: 2px solid $color;
              cursor: $cursor;
            }
          }
          ```

          is compiled to:

          ```css
          .puma-icon {
            background-image: url('/images/puma.png');
            border: 2px solid black;
            cursor: default; }
          .sea-slug-icon {
            background-image: url('/images/sea-slug.png');
            border: 2px solid blue;
            cursor: pointer; }
          .egret-icon {
            background-image: url('/images/egret.png');
            border: 2px solid white;
            cursor: move; }
          ```

          Since **maps** are treated as lists of pairs, multiple assignment works with them as well. For example:

          ```scss
          @each $header, $size in (h1: 2em, h2: 1.5em) {
            #{$header} {
              font-size: $size;
            }
          }
          ```

          is compiled to:

          ```css
          h1 {
            font-size: 2em; }
          h2 {
            font-size: 1.5em; }
          ```

    5. @while

       `@while` 指令重复输出格式直到表达式返回结果为 `false`。这样可以实现比 `@for` 更复杂的循环，只是很少会用到。

    6. 混合指令 (Mixin Directives)

       混合指令（Mixin）用于**定义可重复使用的样式**，避免了使用无语意的 class

       混合指令可以包含所有的 CSS 规则，绝大部分 Sass 规则，甚至通过参数功能引入变量，输出多样化的样式。

       1. ### 定义混合指令 `@mixin` (Defining a Mixin: `@mixin`)

          混合指令的用法是在 `@mixin` 后添加名称与样式，比如名为 `large-text` 的混合通过下面的代码定义：

          ```scss
          @mixin large-text {
            font: {
              family: Arial;
              size: 20px;
              weight: bold;
            }
            color: #ff0000;
          }
          ```

          混合也需要包含选择器和属性，甚至可以用 `&` 引用父选择器：

          ```scss
          @mixin clearfix {
            display: inline-block;
            &:after {
              content: ".";
              display: block;
              height: 0;
              clear: both;
              visibility: hidden;
            }
            * html & { height: 1px }
          }
          ```

       2. ### 引用混合样式 `@include` (Including a Mixin: `@include`)

          使用 `@include` 指令引用混合样式，格式是在其后**添加混合名称**，**以及需要的参数（可选）**：

          ```scss
          .page-title {
            @include large-text;
            padding: 4px;
            margin-top: 10px;
          }
          ```

          编译为

          ```css
          .page-title {
            font-family: Arial;
            font-size: 20px;
            font-weight: bold;
            color: #ff0000;
            padding: 4px;
            margin-top: 10px; }
          ```

          也可以在**最外层引用混合样式**，不会直接定义属性，也不可以使用父选择器。

          ```scss
          @mixin silly-links {
            a {
              color: blue;
              background-color: red;
            }
          }
          @include silly-links;
          ```

          编译为

          ```css
          a {
            color: blue;
            background-color: red; }
          ```

          这种方式就是简单的把@mixin定义的样式输出

          

          混合样式中也可以包含其他混合样式，比如

          ```scss
          @mixin compound {
            @include highlighted-background;
            @include header-text;
          }
          @mixin highlighted-background { background-color: #fc0; }
          @mixin header-text { font-size: 20px; }
          ```

          **混合样式中应该只定义后代选择器**，这样可以安全的导入到文件的任何位置。

       3. ### 参数 (Arguments)

          **参数用于给混合指令中的样式设定变量，并且赋值使用**。

          在定义混合指令的时候，按照变量的格式，通过逗号分隔，将参数写进圆括号里。

          引用指令时，按照参数的顺序，再将所赋的值对应写进括号：

          ```scss
          @mixin sexy-border($color, $width) {
            border: {
              color: $color;
              width: $width;
              style: dashed;
            }
          }
          p { 
              @include sexy-border(blue, 1in); // 传参
          }
          ```

          编译为

          ```css
          p {
            border-color: blue;
            border-width: 1in;
            border-style: dashed; }
          ```

          混合指令也可以使用给变量赋值的方法给参数设定默认值`sexy-border($color, $width: 1in)`, 默认值也支持CSS关键字

          #### 参数变量 (Variable Arguments)

          有时，不能确定混合指令需要使用多少个参数，比如一个关于 `box-shadow` 的混合指令不能确定有多少个 'shadow' 会被用到。这时，可以使用参数变量 `…` 声明（写在参数的最后方）告诉 Sass 将这些参数视为值列表处理：

          ```scss
          @mixin box-shadow($shadows...) {
            -moz-box-shadow: $shadows;
            -webkit-box-shadow: $shadows;
            box-shadow: $shadows;
          }
          .shadows {
            @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
          }
          ```

          编译为

          ```css
          .shadowed {
            -moz-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
            -webkit-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
            box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
          }
          ```

          您可以使用可变参数来包装混合包并添加其他样式，而无需更改mixin的参数声明。 

          如果这样做，那么甚至关键字参数都将传递给包装的mixin。 例如：

          ```scss
          @mixin wrapped-stylish-mixin($args...) {
            font-weight: bold;
            @include stylish-mixin($args...);
          }
          .stylish {
            // The $width argument will get passed on to "stylish-mixin" as a keyword
            @include wrapped-stylish-mixin(#00ff00, $width: 100px);
          }
          ```

          上面注释内的意思是：`$width` 参数将会传递给 `stylish-mixin` 作为关键词。

       4. ### 向混合样式中导入内容 (Passing Content Blocks to a Mixin)

          在引用混合样式的时候，可以先将一段代码导入到混合指令中，然后再输出混合样式，

          额外导入的部分将出现在 `@content` 标志的地方：

          ```scss
          @mixin apply-to-ie6-only {
            * html {
              @content; // 相当于预留自定义的样式插槽
            }
          }
          @include apply-to-ie6-only { // @include内部的规则会作为@content的替换内容
            #logo {
              background-image: url(/logo.gif); // 在@mixin定义的样式表中添加自定义的样式规则
            }
          }
          ```

          编译为

          ```css
          * html #logo {
            background-image: url(/logo.gif);
          }
          ```

          **为便于书写，`@mixin` 可以用 `=` 表示，而 `@include` 可以用 `+` 表示**，

          所以上面的例子可以写成：

          ```sass
          =apply-to-ie6-only
            * html
              @content
          
          +apply-to-ie6-only
            #logo
              background-image: url(/logo.gif)
          ```

          **注意：** 当 `@content` 在指令中出现过多次或者出现在循环中时，额外的代码将被导入到每一个地方。

       5. ### 函数指令 (Function Directives)

          Sass 支持自定义函数，并能在任何属性值或 Sass script 中使用：

          ```scss
          $grid-width: 40px;
          $gutter-width: 10px;
          // @function 指令声明一个函数
          @function grid-width($n) {
            @return $n * $grid-width + ($n - 1) * $gutter-width;
          }
          
          #sidebar { width: grid-width(5); } // 调用一个函数
          ```

          编译为

          ```css
          #sidebar {
            width: 240px; }
          ```

          与 mixin 相同，也可以传递若干个全局变量给函数作为参数。一个函数可以含有多条语句，需要调用 `@return` 输出结果。

       6. 
