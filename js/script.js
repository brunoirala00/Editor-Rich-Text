const buttons = document.querySelectorAll('button');
textField.document.designMode = "On"; // Habilita digitar ou não
let show = false;

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        let cmd = buttons[i].getAttribute('data-cmd');
        if (buttons[i].name === "active") {
            buttons[i].classList.toggle('active');
        }

        if (cmd === "insertImage" || cmd === "createLink") {
            let url = prompt("Insira o link: ", "");
            textField.document.execCommand(cmd, false, url);
            if (cmd === "insertImage") {
                const imgs = document.querySelectorAll('img');
                imgs.forEach(item => {
                    item.style.maxWidth = "500px";
                })
            } else {
                const links = textField.document.querySelectorAll('a');

                links.forEach(item => {
                    item.target = "_blank"
                    item.addEventListener('mouseover', () => {
                        textField.document.designMode = "Off";
                    })
                    item.addEventListener('mouseout', () => {
                        textField.document.designMode = "Off";
                    })
                })
            }

        } else {
            textField.document.execCommand(cmd, false, null);
        }

        if (cmd === 'showCode') {
            const textBody = textField.document.querySelector('body');
            if (show) {
                textBody.innerHTML = textBody.textContent;
                show = false;
            } else {
                textBody.textContent = textBody.innerHTML;
                show = true;
            }
        }
    })
}