[TOC]

# [Simulating Object Collisions With Canvas (joshbradley.me)](https://joshbradley.me/object-collisions-with-canvas/)

*![ObjectCollisionsCanvas](./imgs/ObjectCollisionsCanvas.gif)Satisfying, isn’t it?*

I used this project as my introduction to JavaScript’s canvas and creating a physics simulation. It took me an embarrassingly long time to perfect so I figured it would be worth sharing. (我花了很长时间才变得完美，所以我认为它值得分享。)



The source code can be found [here](https://gist.github.com/joshuabradley012/bd2bc96bbe1909ca8555a792d6a36e04).

## Getting started with canvas

If you have never used HTML5’s `<canvas>` element, [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) has a fantastic beginner’s guide. Otherwise, let’s dive right in.

Using an ES6 class will let us manage state and create immutability later on, so let’s get started with a constructor. To initialize the canvas we need to define the parent, width, and height. Most importantly, we need to assign it’s context to a property that we can use later for drawing.



使用ES6类将允许我们管理状态并在以后创建不变性

初始化画布, 定义父级、宽度和高度

将其上下文分配给一个属性，以便以后可用于绘制。

```javascript
class Canvas {
  constructor(parent = document.body, width = 400, height = 400) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    parent.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }
}
```

With this, we can add methods to draw specific shapes. 

In this case, we’ll only be drawing circles.

```javascript
class Canvas {
  ...
  drawCircle(actor) {
    this.ctx.beginPath();
    this.ctx.arc(actor.position.x, actor.position.y, actor.radius, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fillStyle = actor.color;
    this.ctx.fill();
  }
}
```

Notice that `drawCircle` expects an `actor` with a position and radius property. Let’s implement a basic class that we will build on later.

```javascript
class Ball {
  constructor(x = 20, y = 20, color = 'red', radius = 10) {
    this.color = color;
    this.position = { x: x, y: y };
    this.radius = radius;
  }
}
```

Now for a test…

```javascript
const canvas = new Canvas();
const ball = new Ball();
canvas.drawCircle(ball);
```

![image-20220610143451695](./imgs/image-20220610143451695.png)

*Marvelous!*

The next step is to add some motion to our canvas using an animation loop.

下一步是使用动画循环向我们的画布添加一些动作。



## Adding animation

Before we get ahead of ourselves, let’s create a `Vector` class with some useful linear algebra methods so we can work easily in a coordinate plane.

```javascript
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Returning a new Vector creates immutability
   * and allows chaining. These properties are
   * extremely useful with the complex formulas
   * we'll be using.
   **/
  add(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  subtract(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  multiply(scalar) {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  dotProduct(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  get magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  get direction() {
    return Math.atan2(this.x, this.y);
  }
}
```

And let’s update `Ball` to use an instance of `Vector` for its position.

```javascript
class Ball {
  constructor(x = 20, y = 20, color = 'red', radius = 10) {
    this.color = color;
    this.position = new Vector(x, y);
    this.radius = radius;
  }
}
```

That will make adding motion, collisions, and mass a lot simpler. So about that animation loop, this is going to get complex. MDN’s guide uses a very straightforward animation loop to achieve this. But I’m going to take a page out of [Eloquent JavaScript](https://eloquentjavascript.net/16_game.html) and implement a `State` class that provides some level of encapsulation. This makes it easier to add new shapes or swap out the display with something like WebGL if needed.

这将使添加运动，碰撞和质量变得更加简单。所以关于这个动画循环，这将变得复杂。MDN的指南使用非常简单的动画循环来实现这一点。但是我将从[Eloquent JavaScript](https://eloquentjavascript.net/16_game.html)中取出一个页面，并实现一个提供某种程度的封装的`State`类。这样可以更轻松地添加新形状或在需要时将显示器换成WebGL之类的东西。

`State` should keep track of which display is being used as well as which objects are present in the animation. Finally, there needs to be a method that will update the position of each actor within each frame.

`State`应跟踪正在使用的显示以及动画中存在哪些对象。最后，需要一种方法来更新每个演员在每帧中的位置。

```javascript
class State {
  constructor(display, actors) {
    this.display = display;
    this.actors = actors;
  }

  update(time) {

    /**
     * Provide an update ID to let actors
     * update other actors only once.
     **/
    const updateId = Math.floor(Math.random() * 1000000);
    const actors = this.actors.map(actor => {
      return actor.update(this, time, updateId);
    });
    return new State(this.display, actors);
  }
}
```

Now each `actor` within `State` should have an `update` method to increment the position within each frame. 

For `Ball` we need to add `update` as well as a `velocity` property. 

Because `Ball` is gaining a lot or properties we might want control of, we will provide a config object to the constructor using `Object.assign` as outlined in [clean JavaScript](https://github.com/ryanmcdermott/clean-code-javascript#set-default-objects-with-objectassign).

(现在，`state`中每个`actor` 内部都应该有一个方法来增加每个帧内的位置。)

```javascript
class Ball {
  constructor(config) {
    Object.assign(this,
      {
        type: 'circle',
        position: new Vector(20, 20),
        velocity: new Vector(5, 3),
        radius: 10,
        color: 'red',
      },
      config
    );
  }

  update(state, time, updateId) {

    // Check if hitting left or right of display
    if (this.position.x >= state.display.canvas.width || this.position.x <= 0) {
      this.velocity = new Vector(-this.velocity.x, this.velocity.y);
    }

    // Check if hitting top or bottom of display
    if (this.position.y >= state.display.canvas.height || this.position.y <= 0) {
      this.velocity = new Vector(this.velocity.x, -this.velocity.y);
    }

    return new Ball({
      ...this,
      position: this.position.add(this.velocity),
    });
  }
}
```

To keep `Canvas` up to date, we need to add a `sync` method to be called with each frame. It should redraw every `actor` in `State`.

```javascript
class Canvas() {
  ...
  sync(state) {
    this.drawActors(state.actors);
  }

  drawActors(actors) {
    for (let actor of actors) {
      if (actor.type === 'circle') {
        this.drawCircle(actor);
      }
    }
  }
}
```

Finally we need a function that will recursively call `requestAnimationFrame` to create our animation loop.

```javascript
const runAnimation = animation => {
  let lastTime = null;
  const frame = time => {
    if (lastTime !== null) {
      const timeStep = Math.min(100, time - lastTime) / 1000;

      // return false from animation to stop
      if (animation(timeStep) === false) {
        return;
      }
    }
    lastTime = time;
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
};
```

With that we could technically run the animation. However, canvas keeps track of each frame drawn on it and the resulting animation would look like a paintbrush being dragged across a canvas. Here is what it looks like.

```javascript
const display = new Canvas();
const ball = new Ball();
const actors = [ball];
let state = new State(display, actors);
runAnimation(time => {
  state = state.update(time);
  display.sync(state);
});
```

![ObjectCollisionsCanvas_example-2](./imgs/ObjectCollisionsCanvas_example-2.gif)

To change this we can modify `sync` to clear `Canvas` on each update. (每次更新时清除)

We can achieve this by drawing a white rectangle over the entire `Canvas`. (铺满整个canvas框矩形的填充色)

And we can take advantage of the fact that previous frames are not destroyed. 

If the rectangle is opaque it will create a trail effect due to the previously drawn circles bleeding through.

(如果矩形是不透明的，由于先前绘制的圆圈渗入，它将产生轨迹效果。)

```javascript
class Canvas() {
  ...
  sync(state) {
    this.clearDisplay();
    this.drawActors(state.actors);
  }

  clearDisplay() {

    /**
     * If the rgba opacity is set to 1, there
     * will be no trail. The lower the opacity,
     * the longer the trail.
     **/
    this.ctx.fillStyle = 'rgba(255, 255, 255, .4)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  ...
}
```

Now we have motion!

![ObjectCollisionsCanvas_example-3](./imgs/ObjectCollisionsCanvas_example-3.gif)

***Deep breath\*** it’s time for the final hurdle, adding collisions.



## Detecting collisions

You’ve already seen a bit of collision detection in the last update we made to `Ball` where we are checking if the ball is hitting the walls of the canvas, and updating the velocity accordingly.

However, to find if a ball is colliding with another ball, we have to check *every ball* against *every ball*.  (但是，要找出一个球是否与另一个球碰撞，我们必须检查*每个球*与*每个球*。)

This is very inefficient with an O(n2) runtime but is the best solution outside of creating an elaborate matrix to represent coordinates. And it works well for less than 1000 objects.

这是非常低效率的, 运行时执行复杂度为O(n2)，但是在创建精美的矩阵以表示代表坐标的情况以外是最好的解决方案。 而且它对少于1000个对象的工作正常。)

This can be achieved with a `for` loop on each `update` of `Ball`.

```javascript
class Ball {
  ...
  update(state, time, updateId) {
    ...
    for (let actor of state.actors) {

      // A ball can't collide with itself
      if (this === actor) {
        continue;
      }

      const distance = this.position.subtract(actor.position).magnitude;

      if (distance <= this.radius + actor.radius) {
        this.color = 'grey';
        actor.color = 'grey';
      }
    }

    return new Ball({
      ...this,
      position: this.position.add(this.velocity),
    });
  }
}
```

Because we are using a `Vector` to track the position of the ball, we can measure the distance between two objects using the [magnitude](https://en.wikipedia.org/wiki/Euclidean_vector#Length) of the [difference](https://en.wikipedia.org/wiki/Euclidean_vector#Addition_and_subtraction) between both object’s position.

(因为我们使用矢量来跟踪球的位置，所以我们可以使用两个对象位置之间的差异幅度来测量两个对象之间的距离。)

 Remember position is measured at the object’s center, so to detect when the edges collide, we need to check if that distance is less than both object’s radius combined.

(请记住，位置是在物体的中心测量的，因此要检测边缘何时碰撞，我们需要检查该距离是否小于两个物体半径的总和。)

For now, nothing very interesting happens when the balls collide, they just change color. But it’s a start!

```javascript
const display = new Canvas();

const ball1 = new Ball({
  position: new Vector(40, 100),
  velocity: new Vector(1, 0),
  radius: 20,
});

const ball2 = new Ball({
  position: new Vector(200, 100),
  velocity: new Vector(-1, 0),
  color: 'blue',
});

const actors = [ball1, ball2];
let state = new State(display, actors);

runAnimation(time => {
  state = state.update(time);
  display.sync(state);
});
```

![ObjectCollisionsCanvas_example-4](./imgs/ObjectCollisionsCanvas_example-4.gif)



## Calculating two-dimensional elastic collisions

## 计算二维弹性碰撞

It’s math time! We’re going to be using elastic collisions because I found it to be a fun animation without getting too complex with gravity and friction. But if that’s what you’re after, give it a shot.

Wikipedia has a fantastic animation showing what happens in a 2D collision on their [elastic collision](https://en.wikipedia.org/wiki/Elastic_collision#Two-dimensional) page.



![Two-dimensional elastic collision](./imgs/Elastischer_stoß_2D.gif)

​								Two-dimensional elastic collision

Mathematically this can be defined as the following. Keep in mind there is an alternate formula that uses angles, but because we are using vectors, this is an easier formula to implement.

原文公式为:

```tex
$$ \textbf v^{\prime}_1 = \textbf v_1 - \frac{2m_2}{m_1 + m_2} \frac{\langle \textbf v_1 - \textbf v_2， \textbf x_1 - \textbf x_2 \rangle}{\lVert \textbf x_1 - \textbf x_2 \rVert^2} （\textbf x_1 - \textbf x_2） $$ $$ \textbf v^{\prime}_2 = \textbf v_2 - \frac{2m_1}{m_1 + m_2} \frac{\langle \textbf v_2 - \textbf v_1， \textbf x_2 - \textbf x_1 \rangle}{\lVert \textbf x_2 - \textbf x_1 \rVert^2} （\textbf x_2 - \textbf x_1） $$
```

typora 软件直接解析出来的结果如下:

v1′=v1−2m2m1+m2⟨v1−v2,x1−x2⟩‖x1−x2‖2(x1−x2)

v2′=v2−2m1m1+m2⟨v2−v1,x2−x1⟩‖x2−x1‖2(x2−x1)

拷贝 $$ ~ $$ 之间的内容去网站上生成Tex公式的结果:

![下载](./imgs/tex_公式1.png)

![下载](./imgs/tex_公式2.png)

Where v′ is the resulting velocity vector(v派为得到的速度矢量), v is the current velocity(v为当前速度), m is mass(m为质量), and x is the position(x为位置). 

Angle brackets ⟨…⟩ denote the [dot product](https://www.khanacademy.org/math/linear-algebra/vectors-and-spaces/dot-cross-products/v/vector-dot-product-and-vector-length) of the vector(**尖括号标识矢量的点积**) and double vertical bars ‖…‖ denote the [magnitude or length](https://www.khanacademy.org/math/linear-algebra/vectors-and-spaces/dot-cross-products/v/vector-dot-product-and-vector-length) of the vector(双竖线表示矢量的大小或长度).

双竖线用在了 `x1-x2` & `x2-x1` 的结果上

Currently, `Ball` doesn’t have a representation of its mass. Assuming a constant density, we can use the spherical area of the circle as our mass.

```javascript
class Ball {
  ...
  get sphereArea() {
    return 4 * Math.PI * this.radius ** 2;
  }
}
```

Using the methods we added to the `Vector` class we can write this in JavaScript. It’s not a nice formula, but it is compact and accurate.

```javascript
const collisionVector = (b1, b2) => {
  return b1.velocity

    // Take away from the starting velocity
    .subtract(

      // Subtract the positions
      b1.position
      .subtract(b2.position)

      /**
       * Multiply by the dot product of
       * the difference between the velocity
       * and position of both vectors
       **/
      .multiply(
        b1.velocity
        .subtract(b2.velocity)
        .dotProduct(
          b1.position
          .subtract(b2.position)
        )
        / b1.position
        .subtract(b2.position)
        .magnitude ** 2
      )

      /**
       * Multiply by the amount of mass the
       * object represents in the collision.
       **/
      .multiply(
        (2 * b2.sphereArea)
        / (b1.sphereArea + b2.sphereArea)
      )
    );
};
```

It’s worth bringing attention to how immutability makes this possible. We can perform multiple operations on the same vector without changing it’s properties while returning new vectors that can be used for chaining.

Now we can use this in the `update` method of `Ball`. However, there is another issue we need to resolve. We can’t update velocities one at a time because the current velocity of both actors is necessary to determine their new velocities. And if we update both actor’s velocity now, the velocity will be updated twice because every actor checks every actor.

So we need a way to update both actors together but only update them once. There is likely a better way, but what I came up with is creating an ID for each collision and keeping track of those IDs in an array so we can skip them in the current update. The collision ID is composed of the object ID and update ID.

We already added an update ID to `State` so let’s add an object ID to `Ball` as well as a collisions array. These are the pieces we need to calculate collisions in `Ball.update` so let’s update that as well.

```javascript
class Ball {
  constructor(config) {
    Object.assign(this,
      {
        id: Math.floor(Math.random() * 1000000),
        type: 'circle',
        position: new Vector(40, 40),
        velocity: new Vector(5, 3),
        radius: 10,
        color: 'red',
        collisions: [],
      },
      config
    );
  }

  update(state, time, updateId) {

    // Check if hitting left or right of display
    if (this.position.x >= state.display.canvas.width || this.position.x <= 0) {
      this.velocity = new Vector(-this.velocity.x, this.velocity.y);
    }

    // Check if hitting top or bottom of display
    if (this.position.y >= state.display.canvas.height || this.position.y <= 0) {
      this.velocity = new Vector(this.velocity.x, -this.velocity.y);
    }

    for (let actor of state.actors) {

      /**
       * A ball can't collide with itself and
       * skip balls that have already collided.
       **/
      if (this === actor || this.collisions.includes(actor.id + updateId)) {
        continue;
      }

      const distance = this.position.subtract(actor.position).magnitude;

      if (distance <= this.radius + actor.radius) {
        const v1 = collisionVector(this, actor);
        const v2 = collisionVector(actor, this);
        this.velocity = v1;
        actor.velocity = v2;
        this.collisions.push(actor.id + updateId);
        actor.collisions.push(this.id + updateId);
      }
    }

    return new Ball({
      ...this,
      position: this.position.add(this.velocity),
    });
  }
  ...
}
```

***Phew\***, that was a big update. Time to kick the tires.

```javascript
const display = new Canvas();

const ball1 = new Ball({
  position: new Vector(40, 100),
  velocity: new Vector(1, 0),
  radius: 20,
});

const ball2 = new Ball({
  position: new Vector(200, 100),
  velocity: new Vector(-1, 0),
  color: 'blue',
});

const actors = [ball1, ball2];
let state = new State(display, actors);

runAnimation(time => {
  state = state.update(time);
  display.sync(state);
});
```

![ObjectCollisionsCanvas_example-5](./imgs/ObjectCollisionsCanvas_example-5.gif)

Now that is *awesome*. But unfortunately, we’re not quite done. There are some edge cases we need to deal with.

## Resolve bugs

Here’s our TODO list:

1. Update wall collisions so only the edge touches
2. Fix “sticky” collisions
3. Fix wall squeeze collisions
4. Prevent excessive memory usage

The first issue of wall collisions is relatively simple. We just need to give the position update an upper and lower bound based on the canvas walls.

For the second issue, you’re likely wondering what a sticky collision is. As the description suggests, there are moments when two objects overlap and stick to each other. This leads to a continuous collision update that normally results in a frantic spiraling. It’s an issue that only arises in very specific conditions, but becomes quite common with 10+ balls in the frame.

Here is an example of a sticky collision (if you don’t see it try refreshing the page, they separate over time).



The solution I implemented is a simple bandaid. I check for collisions in the next frame and update the current frame as if they had collided. This way the objects never get a chance to overlap. However, they never get a chance to collide either. Thankfully, the effect is barely noticeable.

In pursuit of a better solution, I looked into calculating the amount of overlap and removing that distance from the current position before adding the new velocity. And it worked in a small environment, but once again issue arose when there were 10+ balls in the simulation. I’m not sure if this is due to float precision, or balls backing up into another.

Wall squeezes occur when a ball hits the wall and another ball at the same time. I don’t have a perfect solution for this. If wall collisions are calculated first, velocity is lost. If they are calculated after, velocity is gained. This is due to the bounding condition we created for wall collisions where the position is stopped exactly when the edge touches the wall. However, if I remove this bounding condition, objects can get stuck against the wall.

I decided to go with the solution that loses velocity because it looks the best with animations that run for a long time.

Finally, because we are keeping track of each collision in each ball, it can quickly overwhelm memory. An easy fix is to trim down the size of the array at a certain limit. I chose 10 as the limit because I have a hard time thinking of a situation where a ball will simultaneously collide with 10 other balls. However, this could be adjusted depending on the needs.

Here is a stable solution to these bugs.

```javascript
class Ball {
  ...
  update(state, time, updateId) {

    /**
     * Limit the size of the collisions array to
     * prevent memory issues. If slice occurs on
     * too many elements, it starts to lag.
     **/
    if (this.collisions.length > 10) {
      this.collisions = this.collisions.slice(this.collisions.length - 3);
    }

    /**
     * Set the upper and lower bounds based on the
     * size of the canvas and size of the ball.
     **/
    const upperLimit = new Vector(
      state.display.canvas.width - this.radius,
      state.display.canvas.height - this.radius
    );
    const lowerLimit = new Vector(0 + this.radius, 0 + this.radius);

    // Check if hitting left or right of display
    if (this.position.x >= upperLimit.x || this.position.x <= lowerLimit.x) {
      this.velocity = new Vector(-this.velocity.x, this.velocity.y);
    }

    // Check if hitting top or bottom of display
    if (this.position.y >= upperLimit.y || this.position.y <= lowerLimit.y) {
      this.velocity = new Vector(this.velocity.x, -this.velocity.y);
    }

    for (let actor of state.actors) {

      /**
       * A ball can't collide with itself and
       * skip balls that have already collided.
       **/
      if (this === actor || this.collisions.includes(actor.id + updateId)) {
        continue;
      }

      /**
       * Check if actors collide in the next frame
       * by adding the current velocity and updating
       * now if they do.
       */
      const distance = this.position.add(this.velocity)
        .subtract(actor.position.add(actor.velocity))
        .magnitude;

      if (distance <= this.radius + actor.radius) {
        const v1 = collisionVector(this, actor);
        const v2 = collisionVector(actor, this);
        this.velocity = v1;
        actor.velocity = v2;
        this.collisions.push(actor.id + updateId);
        actor.collisions.push(this.id + updateId);
      }
    }

    /**
     * Use the bounds to limit the position
     * update.
     **/
    const newX = Math.max(
      Math.min(this.position.x + this.velocity.x, upperLimit.x),
      lowerLimit.x
    );

    const newY = Math.max(
      Math.min(this.position.y + this.velocity.y, upperLimit.y),
      lowerLimit.y
    );

    return new Ball({
      ...this,
      position: new Vector(newX, newY),
    });
  }
  ...
}
```

Now stickiness can only occur if two objects spawn on top of each other. Which can happen using a random generator like I did for the intro animation in this article.

***And we’re done!\*** Let’s give it a final whirl.

```javascript
const display = new Canvas();

const ball1 = new Ball({
  position: new Vector(40, 100),
  velocity: new Vector(2, 3),
  radius: 20,
});

const ball2 = new Ball({
  position: new Vector(200, 100),
  velocity: new Vector(-1, 3),
  color: 'blue',
});

const actors = [ball1, ball2];
let state = new State(display, actors);

runAnimation(time => {
  state = state.update(time);
  display.sync(state);
});
```



![ObjectCollisionsCanvas_example-6](./imgs/ObjectCollisionsCanvas_example-6.gif)

## Final notes

I wrapped all of this in a function with a loop to generate balls of random size, color, at different positions and speeds. You can see all of this in the source code [here](https://gist.github.com/joshuabradley012/bd2bc96bbe1909ca8555a792d6a36e04). But to wrap up the article, here is the script I used to generate the intro animation in this article.

```javascript
const random = (max = 9, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const colors = ['red', 'green', 'blue', 'purple', 'orange'];

const collidingBalls = ({ width = 400, height = 400, parent = document.body, count = 50 }) => {
  const display = new Canvas(parent, width, height);
  const balls = [];
  for (let i = 0; i < count; i++) {
    balls.push(new Ball({
      radius: random(8, 3) + Math.random(),
      color: colors[random(colors.length - 1)],
      position: new Vector(random(width - 10, 10), random(height - 10, 10)),
      velocity: new Vector(random(3, -3), random(3, -3)),
    }));
  }
  let state = new State(display, balls);
  runAnimation(time => {
    state = state.update(time);
    display.sync(state);
  });
};

collidingBalls({
  count: 40,
  height: 260,
  width: 460,
  parent: document.getElementById('hero'),
});
```

This was a lot of fun. But it’s not perfect. There are still issues with imperfect collisions (because the balls do not touch), wall squeezes, and balls that are spawned on top of each other. If you come with a solution for any of these things, please let me know!
