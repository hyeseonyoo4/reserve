export default function NewScenario ({ setNewScenarioInfo}) {

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setNewScenarioInfo(draft => ({
            ...draft,
            [name]: value
        }));
    };

    return (
        <div>
            <label>
                시나리오명:
                <input type="text" name="name" required
                   onChange={handleOnChange}
                />
            </label>
            <br/>
            <label>
                시나리오Key:
                <input type="text" name="key" required
                   onChange={handleOnChange}
                />
            </label>
            <br/>
            <label>
                설명:
                <textarea name="versionDescription" required
                  onChange={handleOnChange}
                />
            </label>
            <br/>
        </div>
    );
}