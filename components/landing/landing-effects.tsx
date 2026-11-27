// @ts-nocheck
"use client";

import { useEffect } from "react";

export function LandingEffects() {
  useEffect(() => {
    const timers = new Set<number>();
    const frames = new Set<number>();
    const observers: Array<{ disconnect(): void }> = [];
    const listeners: Array<
      [
        EventTarget,
        string,
        EventListenerOrEventListenerObject,
        boolean | AddEventListenerOptions | undefined,
      ]
    > = [];
    const nativeAdd = EventTarget.prototype.addEventListener;
    const nativeRemove = EventTarget.prototype.removeEventListener;
    const nativeSetTimeout = window.setTimeout.bind(window);
    const nativeRequestAnimationFrame =
      window.requestAnimationFrame.bind(window);
    const setTimeout = (
      callback: TimerHandler,
      delay?: number,
      ...args: unknown[]
    ) => {
      const id = nativeSetTimeout(callback, delay, ...args);
      timers.add(id);
      return id;
    };
    const requestAnimationFrame = (callback: FrameRequestCallback) => {
      const id = nativeRequestAnimationFrame((time) => {
        frames.delete(id);
        callback(time);
      });
      frames.add(id);
      return id;
    };
    class IntersectionObserver extends window.IntersectionObserver {
      constructor(
        callback: IntersectionObserverCallback,
        options?: IntersectionObserverInit,
      ) {
        super(callback, options);
        observers.push(this);
      }
    }
    class ResizeObserver extends window.ResizeObserver {
      constructor(callback: ResizeObserverCallback) {
        super(callback);
        observers.push(this);
      }
    }
    EventTarget.prototype.addEventListener = function (
      type,
      listener,
      options,
    ) {
      listeners.push([this, type, listener, options]);
      nativeAdd.call(this, type, listener, options);
    };
    try {
      (function () {
        var $ = function (i) {
          return document.getElementById(i);
        };
        var L = {
          next: "Next.js",
          vite: "Vite",
          remix: "Remix",
          react: "React.js",
          clerk: "Clerk",
          auth0: "Auth0",
          supabase: "Supabase",
          firebase: "Firebase",
          tailwind: "Tailwind",
          modules: "CSS Modules",
        };
        var SI = {
          next: {
            p: "M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z",
            c: "#000000",
          },
          vite: {
            p: "M13.056 23.238a.57.57 0 0 1-1.02-.355v-5.202c0-.63-.512-1.143-1.144-1.143H5.148a.57.57 0 0 1-.464-.903l3.777-5.29c.54-.753 0-1.804-.93-1.804H.57a.574.574 0 0 1-.543-.746.6.6 0 0 1 .08-.157L5.008.78a.57.57 0 0 1 .467-.24h14.589a.57.57 0 0 1 .466.903l-3.778 5.29c-.54.755 0 1.806.93 1.806h5.745c.238 0 .424.138.513.322a.56.56 0 0 1-.063.603z",
            c: "#9135FF",
          },
          remix: {
            p: "M21.511 18.508c.216 2.773.216 4.073.216 5.492H15.31c0-.309.006-.592.011-.878.018-.892.036-1.821-.109-3.698-.19-2.747-1.374-3.358-3.55-3.358H1.574v-5h10.396c2.748 0 4.122-.835 4.122-3.049 0-1.946-1.374-3.125-4.122-3.125H1.573V0h11.541c6.221 0 9.313 2.938 9.313 7.632 0 3.511-2.176 5.8-5.114 6.182 2.48.497 3.93 1.909 4.198 4.694ZM1.573 24v-3.727h6.784c1.133 0 1.379.84 1.379 1.342V24Z",
            c: "#000000",
          },
          react: {
            p: "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z",
            c: "#61DAFB",
          },
          clerk: {
            p: "m21.47 20.829-2.881-2.881a.572.572 0 0 0-.7-.084 6.854 6.854 0 0 1-7.081 0 .576.576 0 0 0-.7.084l-2.881 2.881a.576.576 0 0 0-.103.69.57.57 0 0 0 .166.186 12 12 0 0 0 14.113 0 .58.58 0 0 0 .239-.423.576.576 0 0 0-.172-.453Zm.002-17.668-2.88 2.88a.569.569 0 0 1-.701.084A6.857 6.857 0 0 0 8.724 8.08a6.862 6.862 0 0 0-1.222 3.692 6.86 6.86 0 0 0 .978 3.764.573.573 0 0 1-.083.699l-2.881 2.88a.567.567 0 0 1-.864-.063A11.993 11.993 0 0 1 6.771 2.7a11.99 11.99 0 0 1 14.637-.405.566.566 0 0 1 .232.418.57.57 0 0 1-.168.448Zm-7.118 12.261a3.427 3.427 0 1 0 0-6.854 3.427 3.427 0 0 0 0 6.854Z",
            c: "#6C47FF",
          },
          auth0: {
            p: "M21.98 7.448L19.62 0H4.347L2.02 7.448c-1.352 4.312.03 9.206 3.815 12.015L12.007 24l6.157-4.552c3.755-2.81 5.182-7.688 3.815-12.015l-6.16 4.58 2.343 7.45-6.157-4.597-6.158 4.58 2.358-7.433-6.188-4.55 7.63-.045L12.008 0l2.356 7.404 7.615.044z",
            c: "#EB5424",
          },
          supabase: {
            p: "M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z",
            c: "#3FCF8E",
          },
          firebase: {
            p: "M19.455 8.369c-.538-.748-1.778-2.285-3.681-4.569-.826-.991-1.535-1.832-1.884-2.245a146 146 0 0 0-.488-.576l-.207-.245-.113-.133-.022-.032-.01-.005L12.57 0l-.609.488c-1.555 1.246-2.828 2.851-3.681 4.64-.523 1.064-.864 2.105-1.043 3.176-.047.241-.088.489-.121.738-.209-.017-.421-.028-.632-.033-.018-.001-.035-.002-.059-.003a7.46 7.46 0 0 0-2.28.274l-.317.089-.163.286c-.765 1.342-1.198 2.869-1.252 4.416-.07 2.01.477 3.954 1.583 5.625 1.082 1.633 2.61 2.882 4.42 3.611l.236.095.071.025.003-.001a9.59 9.59 0 0 0 2.941.568q.171.006.342.006c1.273 0 2.513-.249 3.69-.742l.008.004.313-.145a9.63 9.63 0 0 0 3.927-3.335c1.01-1.49 1.577-3.234 1.641-5.042.075-2.161-.643-4.304-2.133-6.371m-7.083 6.695c.328 1.244.264 2.44-.191 3.558-1.135-1.12-1.967-2.352-2.475-3.665-.543-1.404-.87-2.74-.974-3.975.48.157.922.366 1.315.622 1.132.737 1.914 1.902 2.325 3.461zm.207 6.022c.482.368.99.712 1.513 1.028-.771.21-1.565.302-2.369.273a8 8 0 0 1-.373-.022c.458-.394.869-.823 1.228-1.279zm1.347-6.431c-.516-1.957-1.527-3.437-3.002-4.398-.647-.421-1.385-.741-2.194-.95.011-.134.026-.268.043-.4.014-.113.03-.216.046-.313.133-.689.332-1.37.589-2.025.099-.25.206-.499.321-.74l.004-.008c.177-.358.376-.719.61-1.105l.092-.152-.003-.001c.544-.851 1.197-1.627 1.942-2.311l.288.341c.672.796 1.304 1.548 1.878 2.237 1.291 1.549 2.966 3.583 3.612 4.48 1.277 1.771 1.893 3.579 1.83 5.375-.049 1.395-.461 2.755-1.195 3.933-.694 1.116-1.661 2.05-2.8 2.708-.636-.318-1.559-.839-2.539-1.599.79-1.575.952-3.28.479-5.072zm-2.575 5.397c-.725.939-1.587 1.55-2.09 1.856-.081-.029-.163-.06-.243-.093l-.065-.026c-1.49-.616-2.747-1.656-3.635-3.01-.907-1.384-1.356-2.993-1.298-4.653.041-1.19.338-2.327.882-3.379.316-.07.638-.114.96-.131l.084-.002c.162-.003.324-.003.478 0 .227.011.454.035.677.07.073 1.513.445 3.145 1.105 4.852.637 1.644 1.694 3.162 3.144 4.515z",
            c: "#DD2C00",
          },
          tailwind: {
            p: "M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z",
            c: "#06B6D4",
          },
          modules: {
            p: "M19.705 2.147v19.706H0V2.147h19.705ZM.141 21.712h19.423V2.288H.141v19.424Zm2.561-10.444c.428 0 .76.113.996.338.236.225.367.482.393.768h-.446a.926.926 0 0 0-.303-.517c-.15-.128-.362-.191-.635-.191-.333 0-.602.117-.808.352-.204.233-.306.59-.306 1.074 0 .396.092.717.276.964.186.245.462.368.828.368.338 0 .595-.13.771-.389.094-.136.163-.316.21-.538h.446c-.04.356-.172.654-.396.895-.268.29-.63.434-1.086.434-.392 0-.722-.118-.989-.356-.35-.315-.527-.8-.527-1.456 0-.499.132-.907.396-1.226.285-.347.679-.52 1.18-.52Zm2.28 2.38c.01.192.056.348.135.467.152.224.42.336.803.336.172 0 .328-.024.47-.073.272-.095.409-.266.409-.511 0-.184-.058-.315-.173-.393-.116-.077-.299-.144-.547-.2l-.458-.104c-.299-.067-.51-.142-.635-.223-.214-.141-.322-.352-.322-.633 0-.303.105-.553.315-.747.21-.195.508-.292.893-.292.354 0 .655.085.902.257.248.17.372.443.372.82h-.43a.847.847 0 0 0-.147-.417c-.14-.177-.377-.265-.71-.265-.27 0-.465.057-.583.17a.533.533 0 0 0-.177.396c0 .166.07.287.207.364.09.049.295.11.614.184l.474.108c.229.052.405.123.53.214.214.158.321.387.321.687 0 .375-.136.642-.41.803a1.822 1.822 0 0 1-.947.242c-.42 0-.75-.108-.987-.322-.237-.213-.354-.502-.35-.867h.43Zm3.137 0c.011.192.056.348.136.467.152.224.42.336.803.336.171 0 .328-.024.469-.073.273-.095.41-.266.41-.511 0-.184-.058-.315-.173-.393-.117-.077-.3-.144-.548-.2l-.457-.104c-.3-.067-.511-.142-.635-.223-.215-.141-.322-.352-.322-.633 0-.303.105-.553.315-.747.21-.195.508-.292.892-.292.355 0 .655.085.902.257.249.17.373.443.373.82h-.43a.847.847 0 0 0-.148-.417c-.14-.177-.376-.265-.71-.265-.27 0-.464.057-.582.17a.533.533 0 0 0-.177.396c0 .166.069.287.207.364.09.049.295.11.614.184l.474.108c.228.052.404.123.529.214.214.158.322.387.322.687 0 .375-.137.642-.41.803a1.822 1.822 0 0 1-.947.242c-.42 0-.75-.108-.987-.322-.238-.213-.355-.502-.35-.867h.43Zm-6.197 3.6.97 2.857.965-2.857h.648v3.38h-.434v-1.995c0-.07.001-.183.004-.343.003-.16.005-.33.005-.513l-.964 2.85h-.453l-.97-2.85v.104c0 .083 0 .21.004.38.004.168.007.292.007.372v1.994h-.437v-3.379h.655Zm4.743-.091c.597 0 1.038.191 1.325.575.224.299.336.681.336 1.147 0 .505-.128.924-.384 1.259-.3.392-.73.589-1.286.589-.52 0-.929-.172-1.226-.516-.265-.33-.398-.75-.398-1.256 0-.457.113-.848.34-1.173.292-.417.723-.625 1.293-.625Zm.046 3.16c.403 0 .695-.144.874-.432.181-.29.272-.623.272-.999 0-.397-.105-.717-.313-.959-.207-.242-.49-.363-.851-.363-.35 0-.635.12-.856.36-.22.24-.331.594-.331 1.061 0 .375.094.69.283.948.19.256.497.384.922.384Zm3.455-.08c.155 0 .283-.017.382-.049a.84.84 0 0 0 .437-.345c.09-.136.156-.311.196-.524a2 2 0 0 0 .034-.355c0-.418-.083-.743-.25-.975-.166-.231-.434-.347-.803-.347H9.35v2.595h.816ZM8.89 17.247h1.368c.465 0 .825.165 1.081.495.229.297.343.679.343 1.143 0 .36-.067.683-.202.973-.238.512-.647.769-1.226.769H8.89v-3.38Zm3.88 0v2.089c0 .245.046.45.138.612.136.245.367.368.69.368.388 0 .652-.133.791-.398.076-.144.113-.338.113-.582v-2.089h.465v1.898c0 .415-.056.735-.168.96-.206.407-.594.61-1.164.61s-.958-.203-1.162-.61c-.112-.225-.168-.545-.168-.96v-1.898h.465Zm2.899 0Zm.458 0v2.977h1.711v.402h-2.17v-3.379h.459Zm2.208 0h2.463v.414h-2.017v1.026h1.865v.391h-1.865v1.146h2.052v.402h-2.498v-3.379Zm3.402 2.29c.01.19.056.347.135.466.152.224.42.336.803.336.172 0 .328-.025.47-.074.272-.095.409-.265.409-.51 0-.184-.058-.315-.173-.394-.116-.076-.299-.143-.547-.2l-.458-.103c-.299-.068-.51-.142-.635-.223-.215-.141-.322-.352-.322-.633 0-.304.105-.553.315-.748.21-.194.508-.292.893-.292.354 0 .655.086.901.258.249.17.373.443.373.819h-.43a.847.847 0 0 0-.147-.416c-.14-.177-.377-.265-.711-.265-.27 0-.464.057-.582.17a.533.533 0 0 0-.177.396c0 .165.069.287.207.363.09.05.295.11.614.184l.474.108c.228.053.405.124.529.214.215.158.322.388.322.688 0 .374-.136.642-.41.803a1.822 1.822 0 0 1-.947.241c-.42 0-.75-.107-.987-.322-.238-.213-.354-.502-.35-.867h.43Z",
            c: "#000000",
          },
        };
        function logo(k) {
          var i = SI[k];
          return i
            ? '<svg viewBox="0 0 24 24" role="img" aria-label="' +
                L[k] +
                '"><path fill="' +
                i.c +
                '" d="' +
                i.p +
                '"/></svg>'
            : "";
        }
        var S = { fw: "next", auth: "clerk", db: "supabase", css: "tailwind" };

        /* ---------- hero demo: pick -> connect -> run ---------- */
        var SC = [
          {
            fw: "next",
            auth: "clerk",
            db: "supabase",
            css: "tailwind",
            port: 3000,
            total: 15,
            files: [
              ["package.json"],
              [".env.example"],
              ["middleware.ts", "clerk"],
              ["app/layout.tsx"],
              ["app/dashboard/page.tsx", "clerk"],
              ["lib/supabase.ts", "supabase"],
              ["postcss.config.mjs", "tailwind"],
              ["app/page.tsx"],
            ],
          },
          {
            fw: "vite",
            auth: "auth0",
            db: "firebase",
            css: "tailwind",
            port: 5173,
            total: 14,
            files: [
              ["package.json"],
              [".env.example"],
              ["vite.config.ts", "tailwind"],
              ["src/main.tsx"],
              ["src/auth/AuthProvider.tsx", "auth0"],
              ["src/routes/Dashboard.tsx", "auth0"],
              ["src/lib/firebase.ts", "firebase"],
              ["src/App.tsx"],
            ],
          },
          {
            fw: "remix",
            auth: "clerk",
            db: "supabase",
            css: "modules",
            port: 5173,
            total: 16,
            files: [
              ["package.json"],
              [".env.example"],
              ["app/root.tsx"],
              ["app/auth.server.ts", "clerk"],
              ["app/routes/dashboard.tsx", "clerk"],
              ["app/lib/supabase.server.ts", "supabase"],
              ["app/routes/_index.module.css", "modules"],
              ["app/routes/_index.tsx"],
            ],
          },
          {
            fw: "react",
            auth: "clerk",
            db: "firebase",
            css: "modules",
            port: 1234,
            total: 14,
            files: [
              ["package.json"],
              [".env.example"],
              ["src/index.tsx"],
              ["src/auth/AuthProvider.tsx", "clerk"],
              ["src/routes/Dashboard.tsx", "clerk"],
              ["src/lib/firebase.ts", "firebase"],
              ["src/App.module.css", "modules"],
              ["src/App.tsx"],
            ],
          },
        ];
        var CAT = [
          ["fw", "Framework"],
          ["auth", "Auth"],
          ["db", "Database"],
          ["css", "Styling"],
        ];
        var END = 10200,
          reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;
        var ha = $("ha"),
          cur = 0,
          ev = [],
          t = 0,
          ei = 0,
          raf = 0,
          last = 0,
          inView = false;
        function esc(x) {
          return String(x).replace(/&/g, "&amp;").replace(/</g, "&lt;");
        }
        function chip(k) {
          return (
            '<span class="tg"><span>' +
            logo(k) +
            "</span><em>" +
            L[k] +
            "</em></span>"
          );
        }
        $("haTabs").innerHTML = SC.map(function (sc, i) {
          return (
            '<button type="button" class="ha-tab" data-i="' +
            i +
            '" aria-pressed="false">' +
            logo(sc.fw) +
            "<span>" +
            L[sc.fw] +
            '</span><em class="bar"></em></button>'
          );
        }).join("");
        var tabs = [].slice.call($("haTabs").children);

        function build(i, final) {
          var sc = SC[i];
          cur = i;
          ev = [];
          t = 0;
          ei = 0;
          tabs.forEach(function (b, j) {
            b.setAttribute("aria-pressed", j === i);
            b.querySelector(".bar").style.width = "0";
          });
          var CK =
            '<svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 5.3l2 2 4-4.6"/></svg>';
          $("haStack").innerHTML = CAT.map(function (c) {
            var k = sc[c[0]];
            return (
              '<div class="ha-pill"><small>' +
              c[1] +
              '</small><div class="lg">' +
              logo(k) +
              "</div><b>" +
              (k === "modules" ? "Modules" : L[k]) +
              '</b><span class="ck">' +
              CK +
              "</span></div>"
            );
          }).join("");
          var pills = [].slice.call($("haStack").children),
            fol = $("haFolder"),
            cnt = $("haCount"),
            fl = $("haFiles"),
            bar = $("haBar");
          fol.classList.remove("in");
          cnt.textContent = "";
          fl.innerHTML = "";
          bar.innerHTML = '<span class="o">Pick a stack…</span>';
          var at = function (ms, fn) {
            ev.push([ms, fn]);
          };
          var rows = sc.files
            .filter(function (f, j) {
              return f[1] || j === 0 || j === sc.files.length - 1;
            })
            .slice(0, 6);
          pills.forEach(function (el, k) {
            at(200 + k * 180, function () {
              el.classList.add("in");
            });
          });
          at(1100, function () {
            fol.classList.add("in");
            cnt.textContent = "generating…";
            bar.innerHTML = '<span class="o">Generating…</span>';
          });
          rows.forEach(function (f, j) {
            at(1300 + j * 190, function () {
              var li = document.createElement("li"),
                i2 = f[0].lastIndexOf("/"),
                d = i2 > -1 ? f[0].slice(0, i2 + 1) : "",
                b = f[0].slice(i2 + 1);
              li.innerHTML =
                "<span><i>" +
                esc(d) +
                "</i>" +
                esc(b) +
                "</span>" +
                (f[1] ? chip(f[1]) : "");
              fl.appendChild(li);
            });
          });
          var tE = 1300 + rows.length * 190;
          pills.forEach(function (el, k) {
            at(tE + 200 + k * 90, function () {
              el.classList.add("ok");
            });
          });
          at(tE + 700, function () {
            cnt.textContent = sc.total + " files";
            bar.innerHTML =
              '<span class="ok"><svg class="ic " aria-hidden="true"><use href="#i-check"/></svg></span>&nbsp;<span class="o">wired together</span>';
          });
          var T0 = tE + 1700,
            txt = "npm run dev";
          at(T0, function () {
            bar.innerHTML =
              '<span class="pr">$</span><span class="tx"></span><span class="cur"></span>';
          });
          txt.split("").forEach(function (ch, k) {
            at(T0 + 60 + k * 60, function () {
              var x = bar.querySelector(".tx");
              if (x) x.textContent += ch;
            });
          });
          at(T0 + 60 + txt.length * 60 + 450, function () {
            bar.innerHTML =
              '<span class="dot"></span><span class="o">ready on&nbsp;</span><span class="ok">http://localhost:' +
              sc.port +
              "</span>";
          });
          ev.sort(function (a, b) {
            return a[0] - b[0];
          });
          if (final) {
            ev.forEach(function (e) {
              e[1]();
            });
            ev = [];
            tabs[i].querySelector(".bar").style.width = "100%";
          }
        }

        function tick(now) {
          raf = 0;
          if (!inView || document.hidden) {
            last = 0;
            return;
          }
          if (!last) last = now;
          t += Math.min(now - last, 64);
          last = now;
          while (ei < ev.length && ev[ei][0] <= t) {
            ev[ei++][1]();
          }
          tabs[cur].querySelector(".bar").style.width =
            Math.min(100, (t / END) * 100) + "%";
          if (t >= END) {
            advance();
            return;
          }
          raf = requestAnimationFrame(tick);
        }
        function go() {
          if (!raf && !reduce) raf = requestAnimationFrame(tick);
        }
        function advance() {
          ha.classList.add("swap");
          setTimeout(function () {
            build((cur + 1) % SC.length);
            ha.classList.remove("swap");
            last = 0;
            go();
          }, 280);
        }
        tabs.forEach(function (b) {
          b.addEventListener("click", function () {
            var i = +b.dataset.i;
            ha.classList.remove("swap");
            if (reduce) {
              build(i, true);
              return;
            }
            build(i);
            last = 0;
            go();
          });
        });
        if (reduce) {
          build(0, true);
        } else {
          build(0);
        }
        new IntersectionObserver(
          function (es) {
            inView = es[0].isIntersecting;
            if (inView) {
              last = 0;
              go();
            }
          },
          { threshold: 0.25 },
        ).observe(ha);
        document.addEventListener("visibilitychange", function () {
          last = 0;
          go();
        });

        /* ---------- cta: package card + highlight on reveal ---------- */
        (function () {
          var c = $("cta"),
            sc = SC[0];
          $("zipL").innerHTML = CAT.map(function (x, k) {
            var key = sc[x[0]];
            return (
              '<li style="transition-delay:' +
              (300 + k * 140) +
              'ms"><span class="lg">' +
              logo(key) +
              "</span><b>" +
              L[key] +
              "</b><small>" +
              x[1] +
              "</small></li>"
            );
          }).join("");
          if (reduce) {
            c.classList.add("on");
            return;
          }
          new IntersectionObserver(
            function (es, o) {
              if (es[0].isIntersecting) {
                c.classList.add("on");
                o.disconnect();
              }
            },
            { threshold: 0.35 },
          ).observe(c);
        })();

        /* ---------- "tools belong together" demo: 4 setups -> 1 wired project ---------- */
        (function () {
          var art = $("wireArt"),
            hub = $("wHub"),
            col = $("wCol"),
            svg = $("wl"),
            wf = $("wf");
          var scat = [
            ["-10px", "-34px", "-4deg"],
            ["16px", "-6px", "3deg"],
            ["-14px", "10px", "-2deg"],
            ["12px", "18px", "4deg"],
          ];
          var cur = 0,
            ev = [],
            t = 0,
            ei = 0,
            raf = 0,
            last = 0,
            inView = false,
            END = 9800,
            paths = [];
          function base(f) {
            return f.slice(f.lastIndexOf("/") + 1);
          }
          function chipHTML(k, l1, l2) {
            return (
              '<span class="lg">' +
              logo(k) +
              '</span><span class="tx"><b>' +
              L[k] +
              '</b><span class="lbl"><span class="l1">' +
              l1 +
              '</span><span class="l2">' +
              esc(l2) +
              "</span></span></span>"
            );
          }
          function layout() {
            if (!paths.length) return;
            var W = wf.offsetWidth,
              H = wf.offsetHeight;
            svg.setAttribute("viewBox", "0 0 " + W + " " + H);
            var x1 = hub.offsetLeft + hub.offsetWidth,
              y1 = hub.offsetTop + hub.offsetHeight / 2;
            paths.forEach(function (o) {
              var c = o.el,
                x2 = col.offsetLeft + c.offsetLeft,
                y2 = col.offsetTop + c.offsetTop + c.offsetHeight / 2,
                dx = (x2 - x1) / 2;
              o.d =
                "M" +
                x1 +
                " " +
                y1 +
                " C" +
                (x1 + dx) +
                " " +
                y1 +
                " " +
                (x2 - dx) +
                " " +
                y2 +
                " " +
                x2 +
                " " +
                y2;
              o.p.setAttribute("d", o.d);
            });
          }
          function build(i, final) {
            var sc = SC[i];
            cur = i;
            ev = [];
            t = 0;
            ei = 0;
            paths = [];
            art.classList.remove("done", "swap");
            var chips = [hub];
            hub.className = "wchip hub";
            hub.innerHTML = chipHTML(sc.fw, "Framework", "my-app/");
            col.innerHTML = ["auth", "db", "css"]
              .map(function (c, j) {
                var key = sc[c],
                  f = sc.files.filter(function (x) {
                    return x[1] === key;
                  })[0];
                return (
                  '<div class="wchip" data-k="' +
                  c +
                  '">' +
                  chipHTML(
                    key,
                    { auth: "Auth", db: "Database", css: "Styling" }[c],
                    f ? base(f[0]) : key,
                  ) +
                  "</div>"
                );
              })
              .join("");
            var tg = [].slice.call(col.children);
            chips = chips.concat(tg);
            svg.innerHTML = "";
            tg.forEach(function (el) {
              var p = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path",
              );
              p.setAttribute("class", "wp");
              p.setAttribute("pathLength", "1");
              svg.appendChild(p);
              paths.push({ el: el, p: p });
            });
            layout();
            chips.forEach(function (c, k) {
              c.style.setProperty("--tx", scat[k][0]);
              c.style.setProperty("--ty", scat[k][1]);
              c.style.setProperty("--r", scat[k][2]);
              c.classList.add("apart");
            });
            var at = function (ms, fn) {
              ev.push([ms, fn]);
            };
            chips.forEach(function (c, k) {
              at(120 + k * 150, function () {
                c.classList.add("in");
              });
            });
            at(1900, function () {
              chips.forEach(function (c) {
                c.classList.remove("apart");
              });
              setTimeout(layout, 760);
            });
            paths.forEach(function (o, j) {
              at(2800 + j * 480, function () {
                layout();
                o.p.classList.add("on");
                hub.classList.add("ok");
              });
              at(2800 + j * 480 + 380, function () {
                o.el.classList.add("ok");
              });
            });
            at(4500, function () {
              art.classList.add("done");
              paths.forEach(function (o, j) {
                var c = document.createElementNS(
                  "http://www.w3.org/2000/svg",
                  "circle",
                );
                c.setAttribute("r", "3.5");
                c.setAttribute("class", "wd");
                var m = document.createElementNS(
                  "http://www.w3.org/2000/svg",
                  "animateMotion",
                );
                m.setAttribute("dur", "1.9s");
                m.setAttribute("repeatCount", "indefinite");
                m.setAttribute("begin", j * 0.35 + "s");
                m.setAttribute("path", o.d);
                c.appendChild(m);
                svg.appendChild(c);
              });
            });
            ev.sort(function (a, b) {
              return a[0] - b[0];
            });
            if (final) {
              chips.forEach(function (c) {
                c.classList.add("in", "ok");
                c.classList.remove("apart");
              });
              layout();
              paths.forEach(function (o) {
                o.p.classList.add("on");
              });
              art.classList.add("done");
              ev = [];
            }
          }
          function tick(now) {
            raf = 0;
            if (!inView || document.hidden) {
              last = 0;
              return;
            }
            if (!last) last = now;
            t += Math.min(now - last, 64);
            last = now;
            while (ei < ev.length && ev[ei][0] <= t) {
              ev[ei++][1]();
            }
            if (t >= END) {
              art.classList.add("swap");
              setTimeout(function () {
                build((cur + 1) % SC.length);
                last = 0;
                go();
              }, 320);
              return;
            }
            raf = requestAnimationFrame(tick);
          }
          function go() {
            if (!raf && !reduce) raf = requestAnimationFrame(tick);
          }
          if (window.ResizeObserver) new ResizeObserver(layout).observe(wf);
          if (reduce) {
            build(0, true);
          } else {
            build(0);
          }
          new IntersectionObserver(
            function (es) {
              var v = es[0].isIntersecting;
              if (v && !inView) {
                /* restart so the story plays from the start when it scrolls in */ build(
                  cur,
                );
              }
              inView = v;
              if (v) {
                last = 0;
                go();
              }
            },
            { threshold: 0.4 },
          ).observe(art);
          document.addEventListener("visibilitychange", function () {
            last = 0;
            go();
          });
        })();

        /* ---------- terminal card: unzip -> keys -> install -> run -> edit ---------- */
        (function () {
          var art = $("termArt"),
            win = $("twWin"),
            term = $("twTerm"),
            envEl = $("twEnv"),
            br = $("twBr"),
            rail = [].slice.call($("trS").children);
          var STEPS = [
            "1 Unzip",
            "2 Add your keys",
            "3 Install",
            "4 Run it",
            "5 Make it yours",
          ];
          var PRE = {
            next: "NEXT_PUBLIC_",
            vite: "VITE_",
            remix: "",
            react: "",
          };
          var EDIT = {
            next: "app/page.tsx",
            vite: "src/App.tsx",
            remix: "app/routes/_index.tsx",
            react: "src/App.tsx",
          };
          var AUTHK = { clerk: "CLERK_PUBLISHABLE_KEY", auth0: "AUTH0_DOMAIN" },
            DBK = { supabase: "SUPABASE_URL", firebase: "FIREBASE_API_KEY" };
          var cur = 0,
            ev = [],
            t = 0,
            ei = 0,
            raf = 0,
            last = 0,
            inView = false,
            END = 16200;
          var cb = $("copy");
          cb.addEventListener("click", function () {
            function ok() {
              cb.querySelector("span").textContent = "Copied";
              cb.querySelector("use").setAttribute("href", "#i-check");
              cb.classList.add("done");
              setTimeout(function () {
                cb.querySelector("span").textContent = "Copy";
                cb.querySelector("use").setAttribute("href", "#i-copy");
                cb.classList.remove("done");
              }, 1600);
            }
            try {
              navigator.clipboard
                .writeText(
                  "unzip my-app.zip\ncd my-app\ncp .env.example .env\nnpm install\nnpm run dev",
                )
                .then(ok, function () {});
            } catch (e) {}
          });
          function step(n) {
            $("trL").textContent = STEPS[n];
            rail.forEach(function (r, k) {
              r.className = k < n ? "done" : k === n ? "on" : "";
            });
          }
          function build(i, final) {
            var sc = SC[i];
            cur = i;
            ev = [];
            t = 0;
            ei = 0;
            art.classList.remove("swap");
            win.classList.remove("env", "back");
            br.classList.remove("show");
            $("hmr").classList.remove("show");
            term.innerHTML = "";
            envEl.innerHTML = "";
            $("tabZ").className = "on";
            $("tabE").className = "";
            $("twCwd").textContent = "~/Downloads";
            $("brUrl").textContent = "localhost:" + sc.port;
            $("brF").textContent = EDIT[sc.fw];
            $("hmrF").textContent = EDIT[sc.fw];
            $("brH").textContent = "Welcome to my-app";
            $("brH").classList.remove("flash");
            step(0);
            var k1 = PRE[sc.fw] + AUTHK[sc.auth],
              k2 = PRE[sc.fw] + DBK[sc.db];
            var at = function (ms, fn) {
                ev.push([ms, fn]);
              },
              line;
            function add(parent, cls, html) {
              var d = document.createElement("div");
              if (cls) d.className = cls;
              d.innerHTML = html;
              parent.appendChild(d);
              return d;
            }
            function cmd(text, start) {
              at(start, function () {
                line = add(
                  term,
                  "",
                  '<span class="pr">$</span><span class="tx"></span><span class="cur"></span>',
                );
              });
              var cl;
              text.split("").forEach(function (ch, k) {
                at(start + 60 + k * 34, function () {
                  var e = term.lastChild.querySelector(".tx");
                  if (e) e.textContent += ch;
                });
              });
              var done = start + 60 + text.length * 34 + 170;
              at(done, function () {
                var c = term.lastChild.querySelector(".cur");
                if (c) c.remove();
              });
              return done;
            }
            function out(html, ms, cls) {
              at(ms, function () {
                add(term, cls || "o", html);
              });
            }
            /* 1 unzip */
            var n = cmd("unzip my-app.zip", 300);
            out(
              '<span class="ok"><svg class="ic " aria-hidden="true"><use href="#i-check"/></svg></span> extracted ' +
                sc.total +
                " files",
              n + 200,
            );
            n = cmd("cd my-app", n + 650);
            at(n, function () {
              $("twCwd").textContent = "~/my-app";
            });
            n = cmd("cp .env.example .env", n + 300);
            /* 2 keys */
            at(n + 200, function () {
              step(1);
            });
            at(n + 400, function () {
              win.classList.add("env");
              $("tabZ").className = "";
              $("tabE").className = "on";
              $("twCwd").textContent = "~/my-app/.env";
            });
            var e0 = n + 650;
            at(e0, function () {
              add(envEl, "c", "# paste the keys from your dashboards");
            });
            [k1, k2].forEach(function (k, j) {
              var s0 = e0 + 400 + j * 1250;
              at(s0, function () {
                add(
                  envEl,
                  "",
                  '<span class="k">' +
                    k +
                    '</span>=<span class="v"></span><span class="cur"></span>',
                );
              });
              for (var b = 0; b < 12; b++)
                (function (b) {
                  at(s0 + 250 + b * 55, function () {
                    var v = envEl.lastChild.querySelector(".v");
                    if (v) v.textContent += "•";
                  });
                })(b);
              at(s0 + 250 + 12 * 55 + 150, function () {
                var c = envEl.lastChild.querySelector(".cur");
                if (c) c.remove();
              });
            });
            var e1 = e0 + 400 + 2 * 1250 + 300;
            /* 3 install */
            at(e1, function () {
              step(2);
              term.innerHTML = "";
              win.classList.remove("env");
              $("tabE").className = "";
              $("tabZ").className = "on";
              $("twCwd").textContent = "~/my-app";
            });
            n = cmd("npm install", e1 + 300);
            at(n + 150, function () {
              add(
                term,
                "o",
                '<span class="pb" id="pbar"><i></i></span><span>installing…</span>',
              );
              setTimeout(function () {
                var b = $("pbar");
                if (b) b.classList.add("go");
              }, 30);
            });
            out(
              '<span class="ok"><svg class="ic " aria-hidden="true"><use href="#i-check"/></svg></span> dependencies installed',
              n + 150 + 1650,
            );
            /* 4 run */
            var r0 = n + 150 + 1650 + 700;
            at(r0, function () {
              step(3);
            });
            n = cmd("npm run dev", r0 + 150);
            out(
              '<span class="dot"></span>ready on <u>http://localhost:' +
                sc.port +
                "</u>",
              n + 500,
              "rd",
            );
            /* 5 make it yours */
            var m0 = n + 500 + 900;
            at(m0, function () {
              step(4);
              win.classList.add("back");
              br.classList.add("show");
            });
            at(m0 + 1500, function () {
              $("hmr").classList.add("show");
              var h = $("brH");
              h.textContent = "Your idea starts here.";
              h.classList.remove("flash");
              void h.offsetWidth;
              h.classList.add("flash");
            });
            END = m0 + 1500 + 3600;
            ev.sort(function (a, b) {
              return a[0] - b[0];
            });
            if (final) {
              ev.forEach(function (e) {
                e[1]();
              });
              ev = [];
              var pb = $("pbar");
              if (pb) pb.classList.add("go");
              win.classList.remove("env");
              $("tabE").className = "";
              $("tabZ").className = "on";
              $("brH").classList.remove("flash");
            }
          }
          function tick(now) {
            raf = 0;
            if (!inView || document.hidden) {
              last = 0;
              return;
            }
            if (!last) last = now;
            t += Math.min(now - last, 64);
            last = now;
            while (ei < ev.length && ev[ei][0] <= t) {
              ev[ei++][1]();
            }
            if (t >= END) {
              art.classList.add("swap");
              setTimeout(function () {
                build((cur + 1) % SC.length);
                last = 0;
                go();
              }, 350);
              return;
            }
            raf = requestAnimationFrame(tick);
          }
          function go() {
            if (!raf && !reduce) raf = requestAnimationFrame(tick);
          }
          if (reduce) {
            build(0, true);
          } else {
            build(0);
          }
          new IntersectionObserver(
            function (es) {
              var v = es[0].isIntersecting;
              if (v && !inView) {
                build(cur);
              }
              inView = v;
              if (v) {
                last = 0;
                go();
              }
            },
            { threshold: 0.4 },
          ).observe(art);
          document.addEventListener("visibilitychange", function () {
            last = 0;
            go();
          });
        })();

        document.documentElement.classList.add("js");
        var bar = $("topbar");
        function sc() {
          bar.classList.toggle("scrolled", window.scrollY > 8);
        }
        sc();
        window.addEventListener("scroll", sc, { passive: true });
        var io = new IntersectionObserver(
          function (es) {
            es.forEach(function (e) {
              if (e.isIntersecting) {
                e.target.classList.add("in");
                io.unobserve(e.target);
              }
            });
          },
          { threshold: 0.15 },
        );
        document.querySelectorAll(".rv").forEach(function (el) {
          io.observe(el);
        });
      })();
    } finally {
      EventTarget.prototype.addEventListener = nativeAdd;
    }
    return () => {
      timers.forEach(window.clearTimeout);
      frames.forEach(window.cancelAnimationFrame);
      observers.forEach((observer) => observer.disconnect());
      listeners.forEach(([target, type, listener, options]) =>
        nativeRemove.call(target, type, listener, options),
      );
      document.documentElement.classList.remove("js");
    };
  }, []);
  return null;
}
