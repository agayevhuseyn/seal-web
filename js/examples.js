fetch('./../data/examples.json').then(data => data.json()).then(data => {displayExamples(data); setMobileMenuEventListener(data)});

const ANIM_DURATION = 200;

const desktopMenu = document.querySelector('.example-left ul')
const mobileMenu = document.querySelector('.example-choose select')
const exampleContent = document.querySelector('.example-right')

const displayExamples = (data) => {
    data.forEach((example, i) => {
        const newLi = document.createElement('li');
        newLi.innerHTML = example.name;
        newLi.onclick = () => {displayExampleContent(example); activateMenu(newLi)};
        if(i === 0) activateMenu(newLi)
        desktopMenu.appendChild(newLi);

        const newOption = document.createElement('option');
        newOption.value = example.name;
        newOption.innerHTML = example.name;
        mobileMenu.appendChild(newOption);
    });

    displayExampleContent(data[0])
}

const displayExampleContent = (example) => {
    animateChanges(exampleContent, () => {
        exampleContent.innerHTML = `<h1>${example.name}</h1>`
        example.content.forEach(block => {
            if(block.type === 'code') {
                const codeBlock = document.createElement('pre');
                codeBlock.innerHTML = `<code class="language-javascript theme-atom-one-dark">${block.value}</code>`;
                exampleContent.appendChild(codeBlock);
                hljs.highlightElement(codeBlock.querySelector('code'));
            } else if(block.type === 'text') {
                exampleContent.innerHTML += `<p>${block.value}</p>`
            } else {
                console.error("Wrong block type on JSON Data for examples")
            }
        })  
    })
}

const activateMenu = (li) => {     
    document.querySelectorAll('.example-left ul li').forEach(li => li.classList.remove('active-example'));
    li.classList.add('active-example');
}

const setMobileMenuEventListener = (examples) => {
    mobileMenu.addEventListener('change', (e) => {
        const example = examples.find(example => example.name === e.target.value);
        displayExampleContent(example);
    })
}

const animateChanges = (container, callback) => {
    container.classList.add('fade-out')
    setTimeout(() => {
        container.classList.remove('fade-out')
        callback()
        container.classList.add('fade-in')
    }, ANIM_DURATION);
    setTimeout(() => {
        container.classList.remove('fade-in')
    }, ANIM_DURATION * 2);
}